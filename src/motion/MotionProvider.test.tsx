import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MotionProvider, MOTION_STORAGE_KEY } from './MotionProvider';
import { MotionToggle } from '@/components/MotionToggle';
import { mockMatchMedia } from '@/test/setup';

function setup() {
  return render(
    <MotionProvider>
      <MotionToggle />
    </MotionProvider>,
  );
}

describe('motion kill switch', () => {
  it('starts with motion on and the switch not pressed', () => {
    mockMatchMedia(() => false);
    setup();
    const toggle = screen.getByRole('button', { name: 'Reduce motion' });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(document.documentElement).not.toHaveClass('reduce-motion');
  });

  it('honours the operating system setting on first render', () => {
    mockMatchMedia((q) => q.includes('prefers-reduced-motion'));
    setup();
    expect(screen.getByRole('button', { name: 'Reduce motion' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(document.documentElement).toHaveClass('reduce-motion');
  });

  it('turns motion off, marks the page, and remembers the choice', async () => {
    mockMatchMedia(() => false);
    setup();
    const toggle = screen.getByRole('button', { name: 'Reduce motion' });

    await userEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(document.documentElement).toHaveClass('reduce-motion');
    expect(window.localStorage.getItem(MOTION_STORAGE_KEY)).toBe('off');
  });

  it('turns motion back on with a second press', async () => {
    mockMatchMedia(() => false);
    setup();
    const toggle = screen.getByRole('button', { name: 'Reduce motion' });

    await userEvent.click(toggle);
    await userEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(document.documentElement).not.toHaveClass('reduce-motion');
    expect(window.localStorage.getItem(MOTION_STORAGE_KEY)).toBe('on');
  });

  it('lets a saved choice override the operating system setting', () => {
    mockMatchMedia((q) => q.includes('prefers-reduced-motion'));
    window.localStorage.setItem(MOTION_STORAGE_KEY, 'on');
    setup();
    expect(screen.getByRole('button', { name: 'Reduce motion' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('disables pointer tilt while motion is off', async () => {
    mockMatchMedia(() => false);
    render(
      <MotionProvider>
        <div className="js-cardtilt" data-testid="card" />
        <MotionToggle />
      </MotionProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Reduce motion' }));
    expect(screen.getByTestId('card').style.getPropertyValue('--pointer-events')).toBe('none');
  });
});
