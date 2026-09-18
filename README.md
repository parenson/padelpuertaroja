# Padel Puerta Roja — weekend portal

A phone-first web app for the Padel Puerta Roja weekend, Cabo San Lucas, October 23–25, 2026.
Live at https://padelpuertaroja.netlify.app (deploys automatically from the main branch).
No build step, no database. Static files only.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole app: design, layout, and behavior. You should rarely need to touch it. |
| `data.js` | **All the content.** Players, pros, schedule, venues, essentials, contacts, links. Edit this. |
| `manifest.webmanifest` | Makes "Add to Home Screen" install it like an app with the logo as the icon. |
| `assets/` | Optimized logo, header mark, and app icons generated from `PadelPuertaRoja3.png`. |
| `build-artifact.py` | Bundles everything into `dist/puerta-roja.html`, a single file for the shareable preview link. |
| `.claude/launch.json` | Local preview server config. |

## Editing content

Open `data.js`. Every field is plain text.

- **Players and pros:** add or edit entries in `players` and `pros`. Leave a field as `""` and it simply won't show. To use a photo, put the image in `assets/` and set `photo: "assets/name.jpg"`.
- **Schedule:** each day has `items` with `start`, `end` (24h), `type` (`clinic`, `match`, `showcase`, `tournament`, `social`, `free`), `title`, `where` (`courts` or `stay`), and `note`.
- **Links:** paste the group chat, playlist, or photo album URL into `event`. Empty links are hidden automatically.
- **Times** are Cabo local time. The app converts them so the countdown and "Happening now" work on any phone anywhere.

## Preview locally

```bash
python -m http.server 8765
```

Then open http://localhost:8765 in a browser.

## Publish (Netlify, free)

1. Create a free account at netlify.com.
2. Drag the whole `PuertaRoja` folder onto the Netlify "Sites" page.
3. Rename the site to something like `padelpuertaroja` for a link like `padelpuertaroja.netlify.app`.
4. To update, drag the folder again. Or connect a GitHub repo for automatic deploys.

Optional: buy a custom domain (about ten dollars a year) and point it at the Netlify site.

## Rebuild the single-file preview

```bash
python build-artifact.py
```
