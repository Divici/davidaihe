import { navLinks, site } from '@/content/site';
import { MotionToggle } from './MotionToggle';

/** Section nav that appears after the hero and leaves before the footer. */
export function Dock() {
  return (
    <nav className="dock js-dock" aria-label="Sections">
      <a className="dock__home js-dock-link" href="#top" aria-label="Back to top">
        {site.initials}
      </a>
      <ul className="dock__links">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a className="dock__link js-dock-link" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <MotionToggle className="motion-toggle--compact" />
    </nav>
  );
}
