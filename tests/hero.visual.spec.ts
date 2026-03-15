import { test, expect } from '@playwright/test';

const viewports = [
  { label: 'mobile-390x844', width: 390, height: 844 },
  { label: 'tablet-768x1024', width: 768, height: 1024 },
  { label: 'desktop-1280x720', width: 1280, height: 720 },
  { label: 'desktop-1536x864', width: 1536, height: 864 },
];

test.describe('Hero visual checks', () => {
  for (const vp of viewports) {
    test(`hero visual - ${vp.label}`, async ({ page }) => {
      await page.addInitScript(() => {
        // Freeze intervals so the carousel doesn't advance during screenshots.
        // eslint-disable-next-line no-undef
        window.setInterval = () => 0;
      });

      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await page.addStyleTag({
        content: `
          * {
            animation-duration: 0s !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0s !important;
            caret-color: transparent !important;
          }
        `,
      });

      const hero = page.locator('#home');
      await expect(hero).toBeVisible();

      const metrics = await page.evaluate(() => {
        const container = document.getElementById('hero-carousel-container');
        const track = document.getElementById('hero-carousel-track');
        const slide = document.querySelector('#hero-carousel-track > div');
        if (!container || !track || !slide) return null;

        const containerRect = container.getBoundingClientRect();
        const trackRect = track.getBoundingClientRect();

        interface Offender {
          tag: string;
          cls: string;
          top: number;
          bottom: number;
        }
        const offenders: Offender[] = [];
        slide.querySelectorAll('*').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < containerRect.top - 1 || rect.bottom > containerRect.bottom + 1) {
            const cls = el.getAttribute('class') || '';
            offenders.push({ tag: el.tagName.toLowerCase(), cls, top: rect.top, bottom: rect.bottom });
          }
        });

        return {
          container: {
            top: containerRect.top,
            bottom: containerRect.bottom,
            height: containerRect.height,
          },
          track: {
            top: trackRect.top,
            bottom: trackRect.bottom,
            height: trackRect.height,
          },
          overflowY: container.scrollHeight > container.clientHeight + 1,
          offenderCount: offenders.length,
          offenders: offenders.slice(0, 6),
        };
      });

      if (metrics) {
        test.info().annotations.push({
          type: 'metrics',
          description: JSON.stringify({ viewport: vp.label, ...metrics }),
        });
      }

      await hero.screenshot({
        path: `test-results/hero-${vp.label}.png`,
        animations: 'disabled',
      });
    });
  }
});