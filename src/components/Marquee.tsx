/**
 * A slow, decorative band of words. The list is rendered twice so the loop
 * is seamless; it is hidden from assistive technology because the same
 * information appears as real content in the Skills section.
 */
export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee" aria-hidden="true">
      {[0, 1].map((copy) => (
        <ul key={copy} className="marquee__group">
          {items.map((item) => (
            <li key={item} className="marquee__item">
              {item}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
