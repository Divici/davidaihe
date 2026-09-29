import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { formatCount } from '@/lib/countTo';

gsap.registerPlugin(ScrollTrigger);

/**
 * The one trigger point every section shares: 20% down the element meets
 * 80% down the viewport. start === end makes it a switch, not a range.
 */
export const TOGGLE = '20% 80%';

export const toggleAt = (trigger: gsap.DOMTarget): ScrollTrigger.Vars => ({
  trigger,
  start: TOGGLE,
  end: TOGGLE,
  toggleActions: 'play none reverse none',
});

const DESKTOP = '(min-width: 1001px)';
const MOBILE = '(max-width: 1000px)';

export type Motion = {
  /** Paused entrance timeline. Play it once the load mask has lifted. */
  hero: gsap.core.Timeline;
  cleanup: () => void;
};

/**
 * All GSAP setup lives here so the kill switch can tear the system down and
 * stand it back up with one call. Every effect sets its own from-state:
 * after a teardown the inline styles are gone.
 */
export function buildMotion(): Motion {
  const mm = gsap.matchMedia();
  const restore: Array<() => void> = [];

  // hero-cascade -----------------------------------------------------------
  gsap.set('.js-mv-1, .js-mv-2, .js-mv-3', { autoAlpha: 0, scale: 1.22 });
  gsap.set('.js-mv-4, .js-mv-5', { autoAlpha: 0, y: 24 });

  const hero = gsap.timeline({ paused: true });
  hero
    .to('.js-mv-1', { autoAlpha: 1, scale: 1, duration: 1.0, ease: 'power3.out' })
    .to('.js-mv-2', { autoAlpha: 1, scale: 1, duration: 1.0, ease: 'power3.out' }, '-=0.65')
    .to('.js-mv-3', { autoAlpha: 1, scale: 1, duration: 1.0, ease: 'power3.out' }, '-=0.65')
    .to('.js-mv-4', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.45')
    .to('.js-mv-5', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.35');

  // flash-develop ----------------------------------------------------------
  gsap.utils.toArray<HTMLElement>('.js-flash').forEach((el, i) => {
    gsap.set(el, { filter: 'brightness(0) invert(1) blur(6px)' });
    gsap.to(el, {
      filter: 'brightness(1) invert(0) blur(0px)',
      ease: 'power4.out',
      duration: 0.7,
      delay: i * 0.1,
      scrollTrigger: toggleAt(el),
    });
  });

  // clip-wipe --------------------------------------------------------------
  gsap.utils.toArray<HTMLElement>('.js-wipe-group').forEach((group) => {
    const band = group.querySelector<HTMLElement>('.js-wipe');
    if (!band) return;
    const fromRight = group.closest('.project--flipped') !== null;
    const closed = fromRight ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';
    const open = fromRight ? 'inset(0 0% 0 0)' : 'inset(0 0 0 0%)';

    gsap.set(group, { autoAlpha: 0, y: 40 });
    gsap.set(band, { clipPath: closed });

    gsap
      .timeline({ scrollTrigger: toggleAt(group) })
      .to(group, { autoAlpha: 1, y: 0, ease: 'power3.out', duration: 0.4 })
      .to(band, { clipPath: open, ease: 'power4.inOut', duration: 0.7 }, '-=0.25')
      // An inset clip would crop the card while it tilts.
      .set(band, { clipPath: 'none' });
  });

  // count-up ---------------------------------------------------------------
  gsap.utils.toArray<HTMLElement>('.js-count').forEach((el, i) => {
    const end = Number(el.dataset.value ?? 0);
    const affix = { prefix: el.dataset.prefix, suffix: el.dataset.suffix };
    const counter = { value: 0 };
    const write = () => {
      el.textContent = formatCount(counter.value, affix);
    };
    write();
    restore.push(() => {
      el.textContent = formatCount(end, affix);
    });
    gsap.to(counter, {
      value: end,
      duration: 1.6,
      ease: 'power2.out',
      delay: i * 0.1,
      onUpdate: write,
      scrollTrigger: toggleAt(el),
    });
  });

  // scrub-parallax, cut-in: amplitude depends on the screen ------------------
  const parallax = (scale: number) => {
    const scrubRange: ScrollTrigger.Vars = {
      trigger: '.js-parallax',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    };
    // Depth is entirely the ratio between layers.
    const layers: Array<[string, number, number]> = [
      ['.js-plx-far', -12, 30],
      ['.js-plx-mid', -6, 16],
      ['.js-plx-near', -2, 6],
      ['.js-plx-front', 4, -10],
    ];
    layers.forEach(([target, from, to]) => {
      gsap.fromTo(
        target,
        { yPercent: from * scale },
        { yPercent: to * scale, ease: 'none', scrollTrigger: scrubRange },
      );
    });

    // One slow ambient layer carries the depth through the rest of the page.
    const pageRange: ScrollTrigger.Vars = {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
    };
    const ambient: Array<[string, number]> = [
      ['.js-amb-1', -40],
      ['.js-amb-2', -110],
      ['.js-amb-3', -190],
    ];
    ambient.forEach(([target, to]) => {
      gsap.fromTo(
        target,
        { yPercent: 0 },
        { yPercent: to * scale, ease: 'none', scrollTrigger: pageRange },
      );
    });
  };

  mm.add(DESKTOP, () => {
    parallax(1);

    gsap.set('.js-cutin > *', { autoAlpha: 0, scale: 2.1 });
    const tl = gsap.timeline({ scrollTrigger: toggleAt('.js-cutin') });
    tl.to('.js-cutin > *:nth-child(1)', {
      autoAlpha: 1,
      scale: 1,
      ease: 'power4.in',
      duration: 0.45,
    })
      .to(
        '.js-cutin > *:nth-child(2)',
        { autoAlpha: 1, scale: 1, ease: 'power4.in', duration: 0.45 },
        '-=0.28',
      )
      .to(
        '.js-cutin > *:nth-child(3)',
        { autoAlpha: 1, scale: 1, ease: 'elastic.out(1, 0.2)', duration: 0.9 },
        '-=0.1',
      );

    return () => tl.kill();
  });

  mm.add(MOBILE, () => {
    parallax(0.45);

    gsap.set('.js-cutin > *', { autoAlpha: 0, scale: 1.5 });
    const tl = gsap.timeline({ scrollTrigger: toggleAt('.js-cutin') });
    tl.to('.js-cutin > *', {
      autoAlpha: 1,
      scale: 1,
      ease: 'power3.out',
      duration: 0.35,
      stagger: 0.12,
    });

    return () => tl.kill();
  });

  return {
    hero,
    cleanup: () => {
      mm.revert();
      restore.forEach((fn) => fn());
    },
  };
}
