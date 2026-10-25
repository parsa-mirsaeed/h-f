# Hambazan Farhikhte — Design system

## Purpose and evidence

Single-page company introduction and **read-only contact directory** for prospective business contacts. Company name and intent provided by the site owner. No address, telephone, public email, industry, or personal contact could be independently verified, so the design never invents them. Unconfigured details are explicitly marked "not yet published". Official values belong in `config.js` only.

## Design direction

Preserve the original 2026 visual identity: a luminous orbital HF monogram against midnight `#101525`, deep slate `#18223B`, porcelain `#F4F5F7`, icy blue `#8BDCF8`, lavender `#BEAAFF`, steel `#7B8493`. Display uses Space Grotesk, reading text DM Sans, utility IBM Plex Mono. The editorial sequence remains dark hero → marquee → introduction → topics → violet statement → light contact directory → dark footer.

## Contact directory (2026 revision)

Replace the original inquiry composer with a quiet, information-led corporate reference panel. Left side: a dark identity card with an animated, abstract secondary HF device, aligned to the hero's actual brand motif. Right side: a light editorial directory with business name, phone, office address and email. The optional named contact displays only when configured. Each row shows a concise explicit pending state until verified data is supplied. Direct call/email/map links appear only when configured. No forms, fake buttons, SMTP, message processing, local storage, collection or external submission; the rest of the landing page's animations remain intact.

## Runtime and accessibility

- `styles.css :root` owns visual tokens; no new duplicate color system.
- `config.js` is the single source of truth for official phone, address, email, and optional business contact name.
- `script.js` sets values via `textContent`, never HTML injection; only safe, intended `tel:`, `mailto:` and encoded map search links are created.
- Navigation is semantic, keyboard accessible, and reduced motion fully respected.
- Directory remains legible at small widths and 200% zoom; links never appear for unconfigured contact fields.
- The public site does not capture visitors' personal data or send messages.
