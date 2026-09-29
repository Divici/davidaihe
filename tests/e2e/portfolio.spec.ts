import { expect, test, type Page } from '@playwright/test';

const PROJECTS = [
  'Jane 1.0',
  'Taskyard',
  'CollabBoard',
  'Nerdy Ads',
  'FortranLens',
  'Pocket Meadery',
];

/** Wait for the load mask to lift and the hero entrance to finish. */
async function ready(page: Page) {
  await page.goto('/');
  await expect(page.locator('.js-loading')).toHaveCount(0, { timeout: 10_000 });
  await expect(page.locator('html')).not.toHaveClass(/is-locked/);
}

test.describe('with motion on', () => {
  test('lifts the load mask and reveals the hero', async ({ page }) => {
    await ready(page);
    const title = page.getByRole('heading', { level: 1 });
    await expect(title).toContainText('full-stack software');
    await expect(title).not.toContainText('front end');
    await expect(title).toBeVisible();
    await expect(page.getByAltText(/Portrait of David Aihe/)).toBeVisible();
  });

  test('shows all six projects, each linked to its repo', async ({ page }) => {
    await ready(page);
    for (const name of PROJECTS) {
      const card = page.getByRole('article', { name });
      await card.scrollIntoViewIfNeeded();
      await expect(card.getByRole('heading', { name, level: 3 })).toBeVisible();
      await expect(card.getByRole('link', { name: `${name} source on GitHub` })).toHaveAttribute(
        'href',
        /^https:\/\/github\.com\/Divici\//,
      );
      await expect(card.getByRole('img').first()).toBeVisible();
    }
  });

  test('loads every image without a broken request', async ({ page }) => {
    const failed: string[] = [];
    page.on('response', (response) => {
      if (response.request().resourceType() === 'image' && !response.ok()) {
        failed.push(`${response.status()} ${response.url()}`);
      }
    });
    await ready(page);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForLoadState('networkidle');
    expect(failed).toEqual([]);
  });

  test('registers scroll triggers and never scrolls sideways', async ({ page }) => {
    await ready(page);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    await expect(page.locator('[data-motion]').first()).toBeAttached();
  });

  test('dock appears after the hero and tracks the current section', async ({ page }) => {
    await ready(page);
    const dock = page.getByRole('navigation', { name: 'Sections' });
    await expect(dock).toBeHidden();

    await page.locator('#skills').scrollIntoViewIfNeeded();
    await page.evaluate(() => {
      const top = document.getElementById('skills')!.getBoundingClientRect().top + scrollY;
      window.scrollTo(0, top);
    });

    await expect(dock).toBeVisible();
    await expect(dock.getByRole('link', { name: 'Skills' })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });

  test('reveals section content once it scrolls into view', async ({ page }) => {
    await ready(page);
    const card = page.locator('.skill-card').first();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveClass(/is-show/);
    await expect(card).toHaveCSS('opacity', '1');
  });
});

test.describe('motion kill switch', () => {
  test('resets every animated element to its final state', async ({ page }) => {
    await ready(page);
    await page.getByRole('button', { name: 'Reduce motion' }).first().click();

    await expect(page.locator('html')).toHaveClass(/reduce-motion/);

    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('[data-motion], .js-scroll')]
        .filter((el) => {
          const style = getComputedStyle(el);
          // Decorative layers keep their designed partial opacity.
          return style.opacity === '0' || style.visibility === 'hidden';
        })
        .map((el) => el.className),
    );
    expect(hidden).toEqual([]);

    const stat = page.locator('.js-count').first();
    await expect(stat).toHaveText('3.5+ yrs');
  });

  test('remembers the choice after a reload and skips the load mask', async ({ page }) => {
    await ready(page);
    await page.getByRole('button', { name: 'Reduce motion' }).first().click();
    await page.reload();

    await expect(page.locator('html')).toHaveClass(/reduce-motion/);
    await expect(page.locator('.js-loading')).toBeHidden();
    await expect(page.getByRole('button', { name: 'Reduce motion' }).first()).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  test('can be turned back on', async ({ page }) => {
    await ready(page);
    const toggle = page.getByRole('button', { name: 'Reduce motion' }).first();
    await toggle.click();
    await toggle.click();
    await expect(page.locator('html')).not.toHaveClass(/reduce-motion/);
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });
});

test.describe('operating system reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('shows the finished page with no mask and no hidden content', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/reduce-motion/);
    await expect(page.locator('.js-loading')).toBeHidden();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    const contact = page.getByRole('heading', { name: "Let's build together." });
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toBeVisible();
  });
});

test.describe('contact headline', () => {
  test.use({ reducedMotion: 'reduce' });

  for (const width of [360, 412, 600, 700, 820, 1000, 1280]) {
    test(`stays clear of the contact cards at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      const box = await page.evaluate(() => {
        const grid = document.querySelector('.contact__grid')!.getBoundingClientRect();
        const plates = [...document.querySelectorAll('.cutin__plate')].map((p) =>
          p.getBoundingClientRect(),
        );
        return {
          gridTop: grid.top,
          lowest: Math.max(...plates.map((r) => r.bottom)),
          left: Math.min(...plates.map((r) => r.left)),
          right: Math.max(...plates.map((r) => r.right)),
          viewport: document.documentElement.clientWidth,
        };
      });
      expect(box.lowest).toBeLessThanOrEqual(box.gridTop);
      expect(box.left).toBeGreaterThanOrEqual(0);
      expect(box.right).toBeLessThanOrEqual(box.viewport);
    });
  }
});

test.describe('footer', () => {
  test('closes with the disciplines band instead of the oversized name', async ({ page }) => {
    await ready(page);
    await expect(page.locator('.footer__wordmark')).toHaveCount(0);
    const band = page.locator('.footer .marquee');
    // The band never stops moving, so scroll the page rather than wait for it to settle.
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(band).toBeVisible();
    await expect(band).toHaveAttribute('aria-hidden', 'true');
  });
});

test.describe('contact form', () => {
  test('explains what is missing and focuses the first problem', async ({ page }) => {
    await ready(page);
    await page.getByRole('button', { name: 'Send message' }).click();

    await expect(page.getByText('Enter your name.')).toBeVisible();
    await expect(page.getByText('Enter your email address.')).toBeVisible();
    await expect(page.getByLabel('Name')).toBeFocused();
  });

  test('sends through the email service and confirms', async ({ page }) => {
    let payload: Record<string, unknown> | undefined;
    await page.route('https://api.emailjs.com/**', async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ status: 200, contentType: 'text/plain', body: 'OK' });
    });

    await ready(page);
    await page.getByLabel('Name').fill('Ada Lovelace');
    await page.getByLabel('Email').fill('ada@example.com');
    await page.getByLabel('Message').fill('I would like to talk about a front-end role.');
    await page.getByRole('button', { name: 'Send message' }).click();

    await expect(page.getByRole('status')).toContainText('Message sent.');
    await expect(page.getByLabel('Name')).toHaveValue('');
    expect(payload?.template_params).toEqual({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'I would like to talk about a front-end role.',
    });
  });

  test('keeps the message and offers the email address when sending fails', async ({ page }) => {
    await page.route('https://api.emailjs.com/**', (route) =>
      route.fulfill({ status: 500, contentType: 'text/plain', body: 'down' }),
    );

    await ready(page);
    await page.getByLabel('Name').fill('Ada Lovelace');
    await page.getByLabel('Email').fill('ada@example.com');
    await page.getByLabel('Message').fill('I would like to talk about a front-end role.');
    await page.getByRole('button', { name: 'Send message' }).click();

    const alert = page.locator('.form-note--bad');
    await expect(alert).toContainText('Your message could not be sent.');
    await expect(alert).toContainText('doa9200@gmail.com');
    await expect(page.getByLabel('Name')).toHaveValue('Ada Lovelace');
  });
});

test.describe('page basics', () => {
  test('has a title, description, and a working résumé link', async ({ page, request }) => {
    await ready(page);
    await expect(page).toHaveTitle(/David Aihe/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /software engineer/i,
    );

    const href = await page.getByRole('link', { name: 'Résumé' }).getAttribute('href');
    const response = await request.get(href!);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('pdf');
  });

  test('reports no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));
    await ready(page);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });
});
