export class ObserveScroll {
  constructor(options: {
    target: string | Element;
    parent?: Element | null;
    threshold?: number[];
    rootMargin?: string;
    alternate?: boolean;
    activeClass?: string;
    complete?: ((entry: IntersectionObserverEntry) => void) | null;
  });
  destroy(): void;
}
