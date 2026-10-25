# Hambazan Farhikhte · Business Website

An expressive, single-page, motion-forward business introduction website, designed for **Hambazan Farhikhte**. Built as dependency-free, accessible static HTML, CSS, and JavaScript.

## Contents

- `index.html`: semantic page sections, SEO metadata, inline connection illustration, and contact composer.
- `styles.css`: responsive visual system, mobile layouts, animation and reduced-motion support.
- `script.js`: navigation, smooth-reveal handling, scroll indicator, inquiry draft and copy functionality.
- `config.js`: centrally managed, optional **verified** contact details.
- `assets/favicon.svg`: bespoke HF identity mark.
- `.github/workflows/pages.yml`: GitHub Actions deployment to GitHub Pages.
- `DESIGN.md`: creative direction, palette, visual decisions and behavior contract.

## Important: contact email

The business's official email, address and telephone number were not supplied and could not be independently verified. **No made-up information is included.** Until an email is provided, submitting the contact composer opens an email *draft* with an empty recipient. It does **not** send a message, and the page says so plainly. The Copy Message action lets a visitor retain the message locally.

To activate addressed email drafts, edit `config.js`:

```js
window.HF_CONFIG = Object.freeze({
  email: "hello@your-verified-business-domain.example",
  phone: "",
  location: ""
});
```

Replace the example with the actual verified business email; don't publish the example address. Contact data never leaves the device through this site: sending happens only if the visitor decides to send from their own email application.

## Local preview

Run from this directory:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Publish on GitHub Pages

1. Upload the full contents of this project to the repository root on the `main` branch at `parsa-mirsaeed/h-f` (include the hidden `.github` directory and `.nojekyll`).
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source, if GitHub has not already enabled it.
3. Check the **Actions → Deploy website to GitHub Pages** workflow. It will deploy the static site automatically on every push to `main`.
4. Once deployment completes, the site should be available at `https://parsa-mirsaeed.github.io/h-f/`.

**One-time setup is required:** this deployment workflow does not automatically enable a new Pages site. The repository owner must select **Settings → Pages → Build and deployment → Source: GitHub Actions**. The first workflow run may fail with “Get Pages site failed” until that setting is saved. After enabling Pages, use **Actions → Deploy website to GitHub Pages → Re-run jobs** (or push a new commit).

## Notes

No backend, tracking pixels, analytics or cookies. Accessible focus, form validation, and reduced-motion support are included. The Google Fonts request is optional; fallbacks work offline. No placeholder testimonials, employee counts, clients or unverifiable company claims are used.