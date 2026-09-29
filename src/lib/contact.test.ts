import { afterEach, describe, expect, it, vi } from 'vitest';
import { validateContact, sendContact, type ContactValues } from './contact';

const valid: ContactValues = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'I would like to talk about a front-end role.',
  company: '',
};

describe('validateContact', () => {
  it('accepts a complete message', () => {
    expect(validateContact(valid)).toEqual({});
  });

  it('requires a name', () => {
    expect(validateContact({ ...valid, name: '  ' }).name).toBe('Enter your name.');
  });

  it.each(['', 'ada', 'ada@', 'ada@example', '@example.com', 'a b@example.com'])(
    'rejects the email "%s"',
    (email) => {
      expect(validateContact({ ...valid, email }).email).toBeDefined();
    },
  );

  it('requires a message of at least 10 characters', () => {
    expect(validateContact({ ...valid, message: 'Hi' }).message).toBe(
      'Write at least 10 characters.',
    );
  });

  it('caps the message length', () => {
    expect(validateContact({ ...valid, message: 'x'.repeat(5001) }).message).toBe(
      'Keep your message under 5,000 characters.',
    );
  });
});

describe('sendContact', () => {
  const config = { serviceId: 'svc', templateId: 'tpl', publicKey: 'key' };

  afterEach(() => {
    vi.useRealTimers();
  });

  it('sends trimmed fields with the configured ids', async () => {
    const send = vi.fn().mockResolvedValue({ status: 200, text: 'OK' });
    await sendContact({ ...valid, name: '  Ada Lovelace ' }, { send, config });
    expect(send).toHaveBeenCalledWith(
      'svc',
      'tpl',
      { name: 'Ada Lovelace', email: 'ada@example.com', message: valid.message },
      { publicKey: 'key' },
    );
  });

  it('silently drops submissions that fill the honeypot', async () => {
    const send = vi.fn();
    await expect(
      sendContact({ ...valid, company: 'Spam Inc' }, { send, config }),
    ).resolves.toBeUndefined();
    expect(send).not.toHaveBeenCalled();
  });

  it('throws a readable error when the service fails', async () => {
    const send = vi.fn().mockRejectedValue({ status: 500, text: 'boom' });
    await expect(sendContact(valid, { send, config })).rejects.toThrow(
      'Your message could not be sent.',
    );
  });

  it('times out when the service never answers', async () => {
    vi.useFakeTimers();
    const send = vi.fn(() => new Promise<never>(() => {}));
    const pending = sendContact(valid, { send, config, timeoutMs: 1000 });
    const assertion = expect(pending).rejects.toThrow('Your message could not be sent.');
    await vi.advanceTimersByTimeAsync(1001);
    await assertion;
  });
});
