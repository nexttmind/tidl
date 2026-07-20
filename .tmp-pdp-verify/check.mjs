import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const slug of ["glp-1-weight-loss", "retatrutide"]) {
  await page.goto(`http://localhost:8081/products/${slug}`, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.waitForSelector(".pdp-hero-prod", { timeout: 20000 });
  const checks = await page.evaluate(() => {
    const text = document.body.innerText;
    const styles = getComputedStyle(document.querySelector(".pdp-page"));
    return {
      title:
        document.querySelector(".pdp-hero-prod-title")?.textContent?.replace(/\s+/g, " ").trim() ||
        "",
      price:
        document
          .querySelector(".pdp-hero-prod-price")
          ?.textContent?.replace(/\s+/g, " ")
          .trim() || "",
      peek: !!document.querySelector(".pdp-hero-vial-peek img"),
      font: styles.fontFamily,
      gold: styles.getPropertyValue("--pdp-gold"),
      hasPen: /TIDL Pen/i.test(text),
      has10: /\$10\b/.test(text),
      hasSku: /\bSKU\b/.test(text),
      hasStars: /reviews/i.test(text),
      hasHowTo: /how-to|how to use/i.test(text),
    };
  });
  console.log(slug, JSON.stringify(checks));
  await page.screenshot({ path: `.tmp-pdp-verify/${slug}-hero.png`, fullPage: false });
}

await browser.close();
