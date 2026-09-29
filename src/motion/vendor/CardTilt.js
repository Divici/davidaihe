/**
 * CardTilt — 3D tilt + holographic flare driven entirely by CSS custom
 * properties.
 *
 * The key architectural idea: JS never styles the flare. It only publishes six
 * numbers onto the host element and lets CSS decide what they mean.
 *
 *   --mouse_x / --mouse_y          normalised cursor, -1 .. 1
 *   --mouse_x_abs / --mouse_y_abs  absolute values, for symmetric effects
 *   --distance                     0 .. ~1, distance from centre
 *   --deg                          angle of travel, for gradient direction
 *   --opacity                      1 while pointer is down/over, 0 otherwise
 *
 * Because the visual layer is pure CSS reading those vars, the same element can
 * be driven by a @keyframes animation instead of the pointer — which is exactly
 * how the auto-demo works (see `variableAnime` in the stylesheet). CSS can
 * animate custom properties, so the card plays its own tilt on scroll with zero
 * extra JS.
 *
 * Movement is eased in a rAF loop rather than written straight from the event,
 * which is what gives it weight. The loop cancels itself once the card settles,
 * so an idle page costs nothing.
 *
 * Expects markup:
 *   <div class="js-cardtilt">
 *     <div class="js-cardtilt_rotate"> ...art...
 *       <div class="js-cardtilt_flare"></div>
 *     </div>
 *   </div>
 */
class CardTilt {
  constructor(element) {
    this.element = element;
    this.size = { w: element.offsetWidth, h: element.offsetHeight };
    this._rotateElem = element.querySelector('.js-cardtilt_rotate');

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    this.mousePos = { x: 0, y: 0, normalizeX: 0, normalizeY: 0 };
    this.cssRotateVal = { x: 0, y: 0 };
    this.exCssRotateVal = { x: 0, y: 0 };
    this.moveCssRotateVal = { x: 0, y: 0 };
    this.mouseMove = { x: 0, y: 0 };
    this.exmouseMove = { x: 0, y: 0 };

    this.MAXANGLE = { x: 30, y: 30 };
    // Touch gets a higher lerp factor: fingers move in bigger jumps, so a
    // slower ease reads as lag rather than as weight.
    this.ANIMATERATIO = isTouch ? 0.1 : 0.05;
    // Frames to wait after mouseleave before forcing the target back to centre.
    this.MOUSELEAVE_MAXCOUNT = 15;

    this.mouseLeaveCount = 0;
    this.mouseLeaveFlg = false;
    this.raf = null;

    let touching = false;

    element.addEventListener('mousemove', (e) => this.moveMouseCalc(e), { capture: true });
    element.addEventListener('mouseenter', (e) => this.enterMouseCalc(e));
    element.addEventListener('mouseleave', (e) => this.leaveMouseCalc(e));

    element.addEventListener(
      'touchstart',
      (e) => { this.enterMouseCalc(e); touching = true; },
      { passive: true }
    );
    element.addEventListener(
      'touchmove',
      (e) => { e.preventDefault(); if (touching) this.moveMouseCalc(e); },
      { passive: false }
    );
    element.addEventListener('touchend', (e) => { this.leaveMouseCalc(e); touching = false; });

    // offsetWidth/Height are cached, so they must be refreshed on resize.
    window.addEventListener('resize', () => {
      this.size = { w: element.offsetWidth, h: element.offsetHeight };
    });
  }

  enterMouseCalc(e) {
    this.element.classList.add('hovering');
    this.readPointer(e);
    this.element.style.setProperty('--opacity', 1);
    if (this.raf === null) this.tick();
  }

  moveMouseCalc(e) {
    if (this.mouseLeaveFlg) {
      this.mouseLeaveFlg = false;
      this.mouseLeaveCount = 0;
    }
    this.readPointer(e);
  }

  leaveMouseCalc() {
    this.element.classList.remove('hovering');
    this.mouseLeaveFlg = true;
    this.element.style.setProperty('--opacity', 0);
  }

  readPointer(e) {
    const point = e.touches ? e.touches[0] : e;
    this.mousePos = this.setMousePos(point.clientX, point.clientY);
  }

  tick() {
    // After the pointer has been gone for N frames, aim at dead centre so the
    // card eases home instead of freezing at its last angle.
    if (this.mouseLeaveFlg) this.mouseLeaveCount++;
    if (this.mouseLeaveCount > this.MOUSELEAVE_MAXCOUNT) {
      this.mousePos = { x: 0, y: 0, normalizeX: 0, normalizeY: 0 };
    }

    this.cssRotateVal = this.setCssRotate(
      this.mousePos.normalizeX,
      this.mousePos.normalizeY,
      this.MAXANGLE.x,
      this.MAXANGLE.y
    );

    // Exponential ease: step a fixed fraction of the remaining gap each frame.
    const dRotX = this.cssRotateVal.x - this.exCssRotateVal.x;
    const dRotY = this.cssRotateVal.y - this.exCssRotateVal.y;
    const dMoveX = this.mousePos.normalizeX - this.exmouseMove.x;
    const dMoveY = this.mousePos.normalizeY - this.exmouseMove.y;

    this.moveCssRotateVal.x = this.exCssRotateVal.x + dRotX * this.ANIMATERATIO;
    this.moveCssRotateVal.y = this.exCssRotateVal.y + dRotY * this.ANIMATERATIO;
    this.mouseMove.x = this.exmouseMove.x + dMoveX * this.ANIMATERATIO;
    this.mouseMove.y = this.exmouseMove.y + dMoveY * this.ANIMATERATIO;

    const distance = this.calcDis(this.mouseMove.x, this.mouseMove.y) / 1.4;

    this.exCssRotateVal = { ...this.moveCssRotateVal };
    this.exmouseMove = { ...this.mouseMove };

    const settled =
      Math.abs(this.moveCssRotateVal.x) < 0.05 && Math.abs(this.moveCssRotateVal.y) < 0.05;

    if (settled) {
      if (this.mouseLeaveFlg) {
        this.mouseLeaveFlg = false;
        this.mouseLeaveCount = 0;
      }
      this.moveCssRotateVal.x = 0;
      this.moveCssRotateVal.y = 0;
      this.writeVars(0, 0, 0, '0deg');
      this.setRotateValueForElement(this._rotateElem, 0, 0);
      // Nothing left to animate — stop burning frames.
      cancelAnimationFrame(this.raf);
      this.raf = null;
      return;
    }

    this.setRotateValueForElement(
      this._rotateElem,
      this.moveCssRotateVal.x,
      this.moveCssRotateVal.y
    );
    const deg = Math.atan2(this.mouseMove.y, this.mouseMove.x) * (180 / Math.PI);
    this.writeVars(this.mouseMove.x, this.mouseMove.y, distance, `${deg.toFixed(4)}deg`);

    this.raf = requestAnimationFrame(() => this.tick());
  }

  writeVars(x, y, distance, deg) {
    const s = this.element.style;
    s.setProperty('--mouse_x', (+x).toFixed(4));
    s.setProperty('--mouse_x_abs', Math.abs(+x).toFixed(4));
    s.setProperty('--mouse_y', (+y).toFixed(4));
    s.setProperty('--mouse_y_abs', Math.abs(+y).toFixed(4));
    s.setProperty('--distance', (+distance).toFixed(4));
    s.setProperty('--deg', deg);
  }

  setRotateValueForElement(el, x, y) {
    el.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
  }

  setMousePos(clientX, clientY) {
    const rect = this.element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    return {
      x,
      y,
      normalizeX: this.normalizeVal(x, this.size.w),
      normalizeY: this.normalizeVal(y, this.size.h),
    };
  }

  // Note the cross-wiring and the sign flip: vertical cursor movement drives
  // rotateX, horizontal drives rotateY, and Y is negated so the card leans
  // *toward* the cursor rather than away from it.
  setCssRotate(nx, ny, maxX, maxY) {
    return { x: ny * maxY, y: nx * maxX * -1 };
  }

  normalizeVal(v, size) {
    return Math.max(-1, Math.min(1, (v / size) * 2 - 1));
  }

  calcDis(x, y) {
    return Math.sqrt(x ** 2 + y ** 2);
  }
}


// Added for module use. Everything above is copied verbatim from the pattern library.
export { CardTilt };
