import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';

async function fill(overrides: Partial<Record<'name' | 'email' | 'message', string>> = {}) {
  const values = {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    message: 'I would like to talk about a front-end role.',
    ...overrides,
  };
  if (values.name) await userEvent.type(screen.getByLabelText('Name'), values.name);
  if (values.email) await userEvent.type(screen.getByLabelText('Email'), values.email);
  if (values.message) await userEvent.type(screen.getByLabelText('Message'), values.message);
}

describe('ContactForm', () => {
  it('labels every field and offers a send button', () => {
    render(<ContactForm onSend={vi.fn()} />);
    expect(screen.getByLabelText('Name')).toBeRequired();
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('Message')).toBeRequired();
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
  });

  it('shows field errors and does not send when the form is incomplete', async () => {
    const onSend = vi.fn();
    render(<ContactForm onSend={onSend} />);

    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));

    expect(screen.getByText('Enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Enter your email address.')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Name')).toHaveFocus();
    expect(onSend).not.toHaveBeenCalled();
  });

  it('clears a field error once the field is corrected', async () => {
    render(<ContactForm onSend={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));
    await userEvent.type(screen.getByLabelText('Name'), 'Ada');
    expect(screen.queryByText('Enter your name.')).not.toBeInTheDocument();
  });

  it('sends the values, shows progress, then confirms and clears the form', async () => {
    let finish: () => void = () => {};
    const onSend = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finish = resolve;
        }),
    );
    render(<ContactForm onSend={onSend} />);
    await fill();

    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));

    expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled();
    expect(onSend).toHaveBeenCalledWith({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'I would like to talk about a front-end role.',
      company: '',
    });

    finish();

    expect(await screen.findByRole('status')).toHaveTextContent('Message sent.');
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
  });

  it('keeps what was typed and explains the failure when sending fails', async () => {
    const onSend = vi.fn().mockRejectedValue(new Error('Your message could not be sent.'));
    render(<ContactForm onSend={onSend} />);
    await fill();

    await userEvent.click(screen.getByRole('button', { name: 'Send message' }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Your message could not be sent.');
    expect(alert).toHaveTextContent('doa9200@gmail.com');
    expect(screen.getByLabelText('Name')).toHaveValue('Ada Lovelace');
  });

  it('hides the honeypot from people and assistive technology', () => {
    const { container } = render(<ContactForm onSend={vi.fn()} />);
    const trap = container.querySelector('input[name="company"]');
    expect(trap).toHaveAttribute('tabindex', '-1');
    expect(trap?.closest('[aria-hidden="true"]')).not.toBeNull();
  });
});
