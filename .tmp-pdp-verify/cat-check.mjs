import { chromium } from "playwright";

const checks = [
  { cat: "weight-loss", expect: ["/products/glp-1-weight-loss", "/products/retatrutide"] },
  { cat: "recovery", expect: ["/products/bpc-157", "/products/tb-500", "/products/wolverine"] },
  { cat: "longevity", expect: ["/products/nad-plus", "/products/ghk-cu", "/products/sermorelin"] },
  { cat: "performance", expect: ["/products/cjc-1295-ipamorelin", "/products/tesamorelin"] },
  { cat: "metabolic-health", expect: ["/products/mots-c"] },
  { cat: "testosterone", expect: [] },
];

const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext();
const page = await context.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

async function dismissAge() {
  for (let i = 0; i < 3; i++) {
    const btn = page.locator('button:has-text("Yes, I am 18")');
    if (await btn.isVisible({ timeout: 1500 }).catch(() => false)) {
      await btn.click({ force: true });
      await page.waitForTimeout(400);
    }
  }
}

for (const { cat, expect } of checks) {
  await page.goto(`http://localhost:8081/category/${cat}`, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  await dismissAge();
  await page.waitForTimeout(500);

  const hrefs = await page.$$eval('a[href*="/products/"]', (as) =>
    [...new Set(as.map((a) => a.getAttribute("href")).filter(Boolean))],
  );
  const penBits = await page.locator(".tdlp5-more-link, #cat-pen").count();
  const missing = expect.filter((h) => !hrefs.includes(h));
  console.log(JSON.stringify({ cat, hrefs, missing, penBits }));

  if (expect[0]) {
    await page.goto(`http://localhost:8081${expect[0]}`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await dismissAge();
    const ok = page.url().includes(expect[0]);
    const hero = await page.locator(".pdp-hero-prod, #hero").count();
    console.log(JSON.stringify({ landed: expect[0], ok, hero }));
  }
}

await browser.close();
