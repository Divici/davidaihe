'use client';

import { useMotion } from '@/motion/MotionProvider';

export function MotionToggle({ className = '' }: { className?: string }) {
  const { motionOff, toggleMotion } = useMotion();

  return (
    <button
      type="button"
      className={`motion-toggle ${className}`}
      aria-pressed={motionOff}
      aria-label="Reduce motion"
      title={motionOff ? 'Motion is off. Press to turn it on.' : 'Press to turn motion off.'}
      onClick={toggleMotion}
    >
      <span className="motion-toggle__track" aria-hidden="true">
        <span className="motion-toggle__thumb" />
      </span>
      <span className="motion-toggle__text" aria-hidden="true">
        Motion {motionOff ? 'off' : 'on'}
      </span>
    </button>
  );
}
