'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useMotion } from './MotionProvider';
import { site } from '@/content/site';

gsap.registerPlugin(useGSAP);

// If an asset stalls, lift anyway rather than hold the visitor hostage.
const MAX_WAIT_MS = 4000;

/**
 * Hides eager asset loading, then hands the page over. Only shown when the
 * boot script has locked the page, so visitors without JavaScript or with
 * reduced motion never see it.
 */
export function LoadMask() {
  const { motionOff, clearMask } = useMotion();
  const veil = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      if (gone) return;

      const finish = () => {
        document.documentElement.classList.remove('is-locked');
        setGone(true);
        clearMask();
      };

      if (motionOff) {
        finish();
        return;
      }

      let lifted = false;
      const lift = () => {
        if (lifted) return;
        lifted = true;
        gsap
          .timeline({ onComplete: finish })
          .to('.js-loading-bar', { scaleX: 1, duration: 0.9, ease: 'power2.inOut' })
          .to('.js-loading-mark', { scale: 1.18, duration: 0.9, ease: 'power2.in' }, 0)
          .to(
            '.js-loading-mark',
            { autoAlpha: 0, filter: 'blur(60px)', duration: 0.8 },
            '-=0.35',
          )
          .to(veil.current, { autoAlpha: 0, duration: 0.7 }, '-=0.45');
      };

      // `load`, not DOMContentLoaded: lifting early defeats the point.
      if (document.readyState === 'complete') lift();
      else window.addEventListener('load', lift, { once: true });
      const fallback = window.setTimeout(lift, MAX_WAIT_MS);

      return () => {
        window.removeEventListener('load', lift);
        window.clearTimeout(fallback);
      };
    },
    { dependencies: [motionOff, gone], scope: veil },
  );

  if (gone) return null;

  return (
    <div ref={veil} className="load-mask js-loading" aria-hidden="true">
      <div className="load-mask__mark js-loading-mark">{site.initials}</div>
      <div className="load-mask__track">
        <span className="load-mask__bar js-loading-bar" />
      </div>
    </div>
  );
}
