import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const slug of ['glp-1-weight-loss', 'retatrutide']) {
  await page.goto('http://localhost:8081/products/' + slug, { waitUntil: 'domcontentloaded', timeout: 60000 });
  const age = page.getByRole('button', { name: /Yes, I am 18/i });
  if (await age.isVisible({ timeout: 5000 }).catch(() => false)) await age.click();
  await page.waitForSelector('.pdp-hero-prod-title', { timeout: 20000 });
  await page.waitForTimeout(800);
  const checks = await page.evaluate(() => {
    const text = document.body.innerText;
    const styles = getComputedStyle(document.querySelector('.pdp-page'));
    const titleEl = document.querySelector('.pdp-hero-prod-title');
    const titleStyle = getComputedStyle(titleEl);
    return {
      title: titleEl?.textContent?.replace(/\s+/g,' ').trim(),
      price: document.querySelector('.pdp-hero-prod-price')?.textContent?.replace(/\s+/g,' ').trim(),
      titleOpacity: titleStyle.opacity,
      titleDisplay: titleStyle.display,
      peek: !!document.querySelector('.pdp-hero-vial-peek img'),
      mainImg: !!document.querySelector('.pdp-hero-prod-img'),
      font: styles.fontFamily,
      gold: styles.getPropertyValue('--pdp-gold').trim(),
      hasPen: /TIDL Pen/i.test(text),
      has10: /\\b/.test(text),
      hasSku: /\bSKU\b/.test(text),
      hasHowTo: /how-to|how to use/i.test(text),
    };
  });
  console.log(slug, JSON.stringify(checks, null, 0));
  await page.screenshot({ path: slug + '-verified.png' });
}
await browser.close();
