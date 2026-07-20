# Code to Figma — TIDL Homepage

Static recreation of the TIDL homepage for HTML → Figma tools.

## Open locally

Open `index.html` in a browser, or serve the folder:

```powershell
cd "code to Figma"
npx --yes serve .
```

## What’s included

- Pure HTML + CSS (no Webflow, no React, no framework classes)
- Sections: announcement, nav/hero, services, TIDL Pen, how it works, reviews, families CTA, FAQ, final CTA, footer
- Local assets in `assets/` (logo, pen, portraits, progress)
- Lifestyle photos still pulled from the existing TIDL CDN URLs

## Notes for Figma import

- Use a plugin like **html.to.design** / **Anima** / paste into browser then capture
- Prefer desktop width (~1440) first
- If CDN images fail offline, download them into `assets/` and update `src` paths in `index.html`
