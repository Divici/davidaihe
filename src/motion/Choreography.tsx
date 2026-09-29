'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { buildMotion, type Motion } from './buildMotion';
import { useMotion } from './MotionProvider';
import { getMotionOff } from './motionStore';
import { ObserveScroll } from './vendor/ObserveScroll';
import { ToggleClassBetweenTriggers } from './vendor/ToggleClassBetweenTriggers';
import { CardTilt } from './vendor/CardTilt';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// CardTilt has no destroy(), so each element is wired at most once.
const tilted = new WeakSet<Element>();
const TILT_MAX_ANGLE = { x: 10, y: 10 };

/** Wires every scroll and pointer effect on the page. Renders nothing. */
export function Choreography() {
  const { motionOff, maskCleared } = useMotion();
  const motion = useRef<Motion | null>(null);

  useGSAP(
    () => {
      // During hydration React still reports the server default (motion on).
      // The store already knows the real answer, so nothing is set up and torn
      // down again for visitors who asked for no motion.
      if (motionOff || getMotionOff()) return;
      const built = buildMotion();
      motion.current = built;
      ScrollTrigger.refresh();
      return () => {
        built.cleanup();
        motion.current = null;
      };
    },
    { dependencies: [motionOff], revertOnUpdate: true },
  );

  useEffect(() => {
    if (!motionOff && maskCleared) {
      ScrollTrigger.refresh();
      motion.current?.hero.play();
    }
  }, [motionOff, maskCleared]);

  // Reveals and the self-demoing cards only toggle classes; CSS does the work,
  // and the kill switch flattens that CSS, so these stay wired either way.
  useEffect(() => {
    const observers = [
      new ObserveScroll({
        target: '.js-scroll',
        threshold: [0.25],
        alternate: false,
        activeClass: 'is-show',
      }),
      new ObserveScroll({
        target: '.js-line',
        threshold: [0.05],
        alternate: false,
        activeClass: 'is-show',
      }),
      ...[...document.querySelectorAll('.js-cardtilt')].map(
        (el) =>
          new ObserveScroll({
            target: el,
            threshold: [0.55],
            alternate: false,
            activeClass: 'is-active',
          }),
      ),
    ];

    const links = [...document.querySelectorAll<HTMLAnchorElement>('.js-dock-link')];
    const spy = new ObserveScroll({
      target: '.js-spy',
      // A section is current while it crosses the middle of the screen.
      rootMargin: '-50% 0px -50% 0px',
      threshold: [0],
      alternate: true,
      activeClass: 'is-inview',
      complete: (entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => {
          const current = a.getAttribute('href') === `#${entry.target.id}`;
          a.classList.toggle('is-current', current);
          if (current) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      },
    });

    const dock = new ToggleClassBetweenTriggers({
      start: '.js-dock-start',
      end: '.js-dock-end',
      target: '.js-dock',
      threshold: { start: 0.35, end: 1 },
      className: 'is-show',
      onChange: (active) => {
        document.querySelector('.js-dock')?.toggleAttribute('inert', !active);
      },
    });

    return () => {
      observers.forEach((o) => o.destroy());
      spy.destroy();
      dock.destroy();
    };
  }, []);

  // holo-tilt needs a precise pointer. On touch it would trap scrolling, so
  // phones get the scroll-triggered self-demo instead.
  useEffect(() => {
    if (motionOff) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    document.querySelectorAll<HTMLElement>('.js-cardtilt').forEach((el) => {
      if (tilted.has(el)) return;
      tilted.add(el);
      const tilt = new CardTilt(el);
      tilt.MAXANGLE = TILT_MAX_ANGLE;
    });
  }, [motionOff]);

  return null;
}
