'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import {
  getMotionOff,
  getServerMotionOff,
  setMotionOff,
  subscribeMotion,
  MOTION_STORAGE_KEY,
} from './motionStore';

export { MOTION_STORAGE_KEY };

type MotionContextValue = {
  /** True when the visitor, or their operating system, asked for no motion. */
  motionOff: boolean;
  toggleMotion: () => void;
  /** True once the load mask has lifted and entrances may play. */
  maskCleared: boolean;
  clearMask: () => void;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export function MotionProvider({ children }: { children: ReactNode }) {
  const motionOff = useSyncExternalStore(subscribeMotion, getMotionOff, getServerMotionOff);
  const [maskCleared, setMaskCleared] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('reduce-motion', motionOff);
    if (motionOff) root.classList.remove('is-locked');

    // Pointer-driven effects survive a GSAP teardown, so they are disabled in CSS.
    document.querySelectorAll<HTMLElement>('.js-cardtilt').forEach((el) => {
      el.style.setProperty('--pointer-events', motionOff ? 'none' : 'all');
    });
  }, [motionOff]);

  const toggleMotion = useCallback(() => setMotionOff(!getMotionOff()), []);
  const clearMask = useCallback(() => setMaskCleared(true), []);

  const value = useMemo(
    () => ({ motionOff, toggleMotion, maskCleared, clearMask }),
    [motionOff, toggleMotion, maskCleared, clearMask],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotion(): MotionContextValue {
  const context = useContext(MotionContext);
  if (!context) throw new Error('useMotion must be used inside <MotionProvider>.');
  return context;
}
