# Hambazan Farhikhte — Design system

## Purpose and evidence

A single-page business introduction and contact site. Audience: prospective business contacts, collaborators, and partners. Primary action: prepare a thoughtful introduction. The company name and contact-oriented brief were supplied by the owner; no independently verified sector, street address, email, or phone number was available when this was produced. The site intentionally avoids inventing these details.

## Creative direction

**Concept: the connection field.** Two ideas converge into a single, luminous presence: intersecting orbital paths frame an abstract HF monogram. This deliberately replaces unverified company photography with a bespoke geometric identity.

**Palette**: midnight `#101525` (foundation); deep slate `#18223B` (surface); porcelain `#F4F5F7` (reading surface); icy blue `#8BDCF8` (connection); lavender `#BEAAFF` (kinetic highlight); muted steel `#7B8493` (supporting text). The statement panel uses a violet gradient `#343BA4` to `#7774D2`.

**Typography**: Space Grotesk for display and brand; DM Sans for reading, forms, buttons; IBM Plex Mono for signals, metadata, and wayfinding. Google Fonts with system fallbacks.

**Layout**: Dark immersive hero with right-hand orbital centerpiece → contrast marquee → pale editorial introduction → three topic cards → violet declaration → clean contact composer → dark concluding brand panel. Clear full-page rhythm; sparse structural labels encode section purpose.

**Motion**: Intro staging, slowly revolving ellipses, buoyant central sphere, minimal pointer parallax, scroll-triggered text and cards, and a purposeful horizontal ticker. Under `prefers-reduced-motion`, all motion ceases and content remains visible. Animation never contains essential information.

## Interface and behavioral choices

- Accessible anchor navigation; responsive menu button with expanded state and Escape dismissal.
- Semantically labeled fields with inline error messages, keyboard support, and local-only form handling.
- This static GitHub Pages site **never sends or stores contact data**. `config.js` owns the verified contact email. Until configured, the button opens a draft with no recipient, explicitly explained in the UI. The Copy Message button offers a local alternative.
- The page uses CSS variables as the canonical runtime tokens (`styles.css :root`). No framework or build step is needed.
- Scrollbars remain operable and visible; layout reserves illustration space. Keyboard focus remains visible. Motion preference is honored.

## Contact setup

When an official company email is confirmed, set `window.HF_CONFIG.email` in `config.js`. The public contact instructions and generated mailto destination update automatically. Phone and location fields are held for a future iteration and are not displayed without verification.