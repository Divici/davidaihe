import { navLinks, site } from '@/content/site';
import { GitHubIcon, LinkedInIcon } from '../icons';

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__wordmark js-flash" data-motion aria-hidden="true">
        {site.name}
      </p>

      <div className="footer__row">
        <p className="footer__note">
          {site.role}
          <br />
          {site.location}
        </p>

        <nav aria-label="Footer">
          <ul className="footer__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="socials" aria-label="Profiles">
          <li>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
              <span>GitHub</span>
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
          </li>
        </ul>
      </div>

      <p className="footer__legal">
        © {new Date().getFullYear()} {site.name}. Built with Next.js, TypeScript, and GSAP.
      </p>
    </footer>
  );
}
