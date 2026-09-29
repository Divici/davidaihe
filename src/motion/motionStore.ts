export const MOTION_STORAGE_KEY = 'motion';
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

type Choice = 'on' | 'off';

const listeners = new Set<() => void>();
// Used when storage is blocked (private windows), so the switch still works for the visit.
let memoryChoice: Choice | null = null;

function readChoice(): Choice | null {
  try {
    const saved = window.localStorage.getItem(MOTION_STORAGE_KEY);
    return saved === 'on' || saved === 'off' ? saved : memoryChoice;
  } catch {
    return memoryChoice;
  }
}

export function getMotionOff(): boolean {
  const choice = readChoice();
  if (choice) return choice === 'off';
  return window.matchMedia(REDUCED_QUERY).matches;
}

export function getServerMotionOff(): boolean {
  return false;
}

export function setMotionOff(off: boolean) {
  const choice: Choice = off ? 'off' : 'on';
  memoryChoice = choice;
  try {
    window.localStorage.setItem(MOTION_STORAGE_KEY, choice);
  } catch {
    // Storage unavailable: the in-memory choice above still applies.
  }
  listeners.forEach((notify) => notify());
}

export function subscribeMotion(notify: () => void) {
  listeners.add(notify);
  const media = window.matchMedia(REDUCED_QUERY);
  media.addEventListener?.('change', notify);
  window.addEventListener('storage', notify);
  return () => {
    listeners.delete(notify);
    media.removeEventListener?.('change', notify);
    window.removeEventListener('storage', notify);
  };
}

/** Test helper: forget the in-memory choice between cases. */
export function resetMotionStore() {
  memoryChoice = null;
}

/**
 * Runs in <head> before first paint so the saved choice and the page lock
 * apply before anything is drawn.
 */
export const motionBootScript = `(function(){try{var d=document.documentElement,s=null;try{s=localStorage.getItem('${MOTION_STORAGE_KEY}')}catch(e){}var off=s==='off'||(s!=='on'&&matchMedia('${REDUCED_QUERY}').matches);if(off){d.classList.add('reduce-motion')}else{d.classList.add('is-locked')}d.classList.add('js')}catch(e){}})()`;
