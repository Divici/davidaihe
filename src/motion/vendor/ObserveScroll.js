/**
 * ObserveScroll — class-toggling on scroll via IntersectionObserver.
 *
 * The cheap half of the system. No GSAP involved: this only adds/removes a
 * class, and CSS owns the actual transition. Use it for the 80% of reveals
 * that are just "fade + rise", and save GSAP for orchestrated sequences.
 *
 * @param {string|Element} target      Selector (matches all) or a single element.
 * @param {Element|null}   parent      IntersectionObserver root. null = viewport.
 * @param {number[]}       threshold   Visible ratio(s) that fire the callback.
 * @param {string}         rootMargin  Grow/shrink the trigger box.
 * @param {boolean}        alternate   See "Two replay modes" below.
 * @param {string}         activeClass Class to toggle.
 * @param {Function}       complete    Called with the IntersectionObserverEntry.
 *
 * Two replay modes:
 *   alternate: true  — symmetric. Class tracks visibility exactly, so the
 *                      element re-animates every time it leaves in ANY
 *                      direction. Good for looping/ambient effects.
 *   alternate: false — asymmetric, and the better default. The class is only
 *                      removed when the element exits *below* the fold
 *                      (boundingClientRect.y > 0). Scroll past it upward and it
 *                      stays revealed, so scrolling back down doesn't replay a
 *                      wall of animations you already watched.
 */
class ObserveScroll {
  constructor({
    target,
    parent = null,
    threshold = [0.1],
    rootMargin = '0px 0px',
    alternate = false,
    activeClass = 'is-active',
    complete = null,
  }) {
    this.elements =
      typeof target === 'string' ? [...document.querySelectorAll(target)] : [target];
    this.options = { root: parent, threshold, rootMargin };
    this.alternate = alternate;
    this.activeClass = activeClass;
    this.callback = complete;
    this.createObserver();
  }

  createObserver() {
    const { alternate, activeClass, callback } = this;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (alternate) {
          entry.target.classList.toggle(activeClass, entry.isIntersecting);
          callback?.(entry);
          return;
        }

        // Exited below the fold — safe to re-arm.
        if (!entry.isIntersecting && entry.boundingClientRect.y > 0) {
          entry.target.classList.remove(activeClass);
          callback?.(entry);
        }
        if (entry.isIntersecting) {
          entry.target.classList.add(activeClass);
          callback?.(entry);
        }
      });
    }, this.options);

    this.elements.forEach((el) => this.observer.observe(el));
  }

  destroy() {
    this.observer.disconnect();
  }
}


// Added for module use. Everything above is copied verbatim from the pattern library.
export { ObserveScroll };
