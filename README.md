# Hambazan Farhikhte · Business Contact Website

An animated, responsive, single-page company introduction and **informational contact directory**. Hosted as static HTML, CSS, and JavaScript on GitHub Pages.

## Contact directory — no backend needed

The Contact section displays the business name, telephone, office address, and business email. A named contact can be added optionally. It has **no contact form, SMTP integration, database, or message storage**. Valid phone/email/address details become direct `tel:`, `mailto:` and map links; other details are display-only.

The owner has not supplied a verified telephone number, office address, email or named contact. These are not invented. Until populated, each relevant field says that the detail is not yet published and its action link is hidden.

**To add the verified public information, edit `config.js` in GitHub**:

```js
window.HF_CONFIG = Object.freeze({
  email: "",         // Official public email address (optional)
  phone: "",         // Official public telephone number
  address: "",       // Full official office address
  contactPerson: ""  // Optional authorized contact person's name
});
```

Fill the actual details between quotes, commit, and GitHub Pages will automatically publish the update. Any field you leave blank remains clearly marked as unpublished. Don't add private or unapproved personal contact information.

## Files

- `index.html` — semantic page, company overview, read-only contact directory.
- `styles.css` — visual identity, responsive layout and animations.
- `script.js` — navigation, scroll/reveal animations and safe contact detail rendering.
- `config.js` — verified public contact details editable in one place.
- `DESIGN.md` — design decisions and accessibility notes.
- `.github/workflows/pages.yml` — auto-deploy from `main` to GitHub Pages.

## Preview locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`. Deploy by pushing to `main` with GitHub Pages configured to use GitHub Actions. The site URL is https://parsa-mirsaeed.github.io/h-f/.

No third-party API keys, server endpoints, trackers, cookies, contact-message collection, or build tools are required. The visual typefaces load from Google Fonts with local fallbacks. Reduced-motion preferences and visible keyboard focus are supported.

## Languages and localization

The site includes **English, Russian, Persian (Farsi), Simplified Chinese, German, and Arabic**. Use the globe-language selector in the header. The entire page and read-only contact directory update without reloading. Persian and Arabic use right-to-left layout; `?lang=ru`, `?lang=fa`, `?lang=zh`, `?lang=de`, and `?lang=ar` are shareable localized links. The site defaults to the visitor's supported browser language or English. No language preference is sent to a server or stored in local storage.

Translations and accessibility strings are maintained together in `i18n.js`, while `config.js` stays the single source of truth for approved contact details. Company names, email addresses, international phone numbers, and the official address are not silently translated or reformatted.

Typefaces use script-specific Google Fonts plus local fallbacks: Manrope for Russian, Noto Sans SC for Simplified Chinese, IBM Plex Sans Arabic for Arabic, and the original Space Grotesk / DM Sans for English and German. For Persian, the preferred family is **Yekan Bakh**, but this is a commercially licensed font and is **not bundled**. The fully working default is openly licensed **Vazirmatn**. If you have a valid Yekan Bakh website license, place your authorized WOFF2 asset in `assets/fonts/` and add the corresponding `@font-face` declaration in `styles.css`; do not commit unauthorized font files. The page remains readable if external font loading is blocked.

**Verification:** `node --check i18n.js`, `node --check script.js`; translation-key parity across all six dictionaries. Check the real GitHub Pages site on desktop and mobile for final visual QA after deployment.
