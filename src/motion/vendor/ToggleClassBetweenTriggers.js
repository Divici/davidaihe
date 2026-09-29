/**
 * ToggleClassBetweenTriggers — hold a class on a target for the scroll range
 * between two sentinel elements.
 *
 * This is the "sticky nav appears after the hero and disappears at the footer"
 * primitive. ScrollTrigger can do it, but this is ~30 lines with no dependency,
 * and it reads as a range rather than as two separate triggers.
 *
 * Both sentinels are measured the same way — top edge against a fraction of the
 * viewport — so `threshold: 1` means "when its top passes the bottom of the
 * screen" and `0` means "when its top passes the top of the screen".
 *
 * @param {string}   start     Selector for the element that switches it ON.
 * @param {string}   end       Selector for the element that switches it OFF.
 * @param {string}   target    Selector for the element receiving the class.
 * @param {Object}   threshold { start, end } viewport fractions. Default 0.5.
 * @param {string}   className Class to hold. Default 'is-active'.
 * @param {Function} onChange  Fired only on transitions, with the new boolean.
 */
class ToggleClassBetweenTriggers {
  constructor({ start, end, target, threshold, className = 'is-active', onChange }) {
    this.el = {
      start: document.querySelector(start),
      end: document.querySelector(end),
      target: document.querySelector(target),
    };
    this.threshold = {
      start: threshold?.start ?? 0.5,
      end: threshold?.end ?? 0.5,
    };
    this.className = className;
    this.onChange = onChange;
    this.previousState = null;

    if (!this.el.start || !this.el.end || !this.el.target) return;
    this.init();
  }

  init() {
    this.calculate();
    this.handler = () => this.calculate();
    window.addEventListener('scroll', this.handler, { passive: true });
    window.addEventListener('resize', this.handler);
  }

  calculate() {
    const { start, end, target } = this.el;
    const passedStart =
      start.getBoundingClientRect().top < window.innerHeight * this.threshold.start;
    const passedEnd =
      end.getBoundingClientRect().top < window.innerHeight * this.threshold.end;

    const active = passedStart && !passedEnd;
    target.classList.toggle(this.className, active);

    // Only notify on an actual edge, not on every scroll frame.
    if (this.previousState !== active) {
      this.onChange?.(active);
      this.previousState = active;
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.handler);
    window.removeEventListener('resize', this.handler);
  }
}


// Added for module use. Everything above is copied verbatim from the pattern library.
export { ToggleClassBetweenTriggers };
