# La Víbora Invitational — weekend portal

A phone-first web app for the La Víbora Invitational padel weekend (originally named Padel Puerta Roja), Cabo San Lucas, October 23–25, 2026.
Live at https://laviborainvitational.netlify.app (deploys automatically from the main branch).
No build step, no database. Static files only.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole app: design, layout, and behavior. You should rarely need to touch it. |
| `data.js` | **All the content.** Players, pros, schedule, venues, essentials, contacts, links. Edit this. |
| `manifest.webmanifest` | Makes "Add to Home Screen" install it like an app with the logo as the icon. |
| `assets/` | `NewLogo.png` is the source logo. `logo.webp`, `badge.png`, and the icons are cut-out, resized versions generated from it. |
| `build-artifact.py` | Bundles everything into `dist/puerta-roja.html`, a single file for the shareable preview link. |
| `.claude/launch.json` | Local preview server config. |

## Editing content

Open `data.js`. Every field is plain text.

- **Players and pros:** add or edit entries in `players` and `pros`. Each has `name`, `bio` (the blurb shown under the name), and an optional `tag` label that only shows if set. Leave a field as `""` and it simply won't show.
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
3. The site name in Netlify is `laviborainvitational`.
4. To update, drag the folder again. Or connect a GitHub repo for automatic deploys.

Optional: buy a custom domain (about ten dollars a year) and point it at the Netlify site.

## Rebuild the single-file preview

```bash
python build-artifact.py
```
