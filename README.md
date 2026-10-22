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
| `config.js` | Backend connection (Supabase project URL and publishable key) for the Gallery and Bracket. |
| `backend.js` | Small client used by both pages to read photos and the bracket, upload photos, and (admin) write. |
| `admin.html`, `admin.css`, `admin.js` | Organizer page: sign in, build teams and pools, enter scores, publish the bracket, remove photos. |
| `supabase-setup.sql` | One-time backend setup. Paste into the Supabase SQL Editor and run. |
| `.claude/launch.json` | Local preview server config. |

## Editing content

Open `data.js`. Every field is plain text.

- **Players and pros:** add or edit entries in `players` and `pros`. Each has `name`, `bio` (the blurb shown under the name), and an optional `tag` label that only shows if set. Leave a field as `""` and it simply won't show.
- **Schedule:** each day has `items` with `start`, `end` (24h), `type` (`clinic`, `match`, `showcase`, `tournament`, `social`, `free`), `title`, `where` (a key from `venues`, such as `courts`, `stay`, `beach`, `montage`, or `""` for no location), and `note`. A dinner can also carry a `menu` (see the Saturday dinner for the shape); it renders as a tap-to-open menu on the item.
- **Links:** paste the group chat, playlist, or photo album URL into `event`. Empty links are hidden automatically.
- **Weather:** each schedule day shows a live forecast from open-meteo.com for the coordinates in `event.weather`. No key or account needed. If the forecast can't load, the strip is simply hidden.
- **Times** are Cabo local time. The app converts them so the countdown and "Happening now" work on any phone anywhere.

## Gallery and Bracket (backend)

Photos and the tournament bracket live in a free Supabase project, not in this repo, so they update instantly without a deploy.

- **Participants** open the Gallery tab and tap Choose photos. Photos are shrunk on the phone before upload. Anyone with the link can add; only organizers can remove.
- **Organizers** open `admin.html` (linked in the footer as "Organizers"), sign in, build the draw, enter scores, and tap Publish bracket. The Bracket tab updates within 30 seconds.
- **Format:** two pools, then a championship bracket (semifinals, final, 3rd place match) for the top two in each pool and a consolation bracket (semifinals, final) for the rest. Once every pool match has a score the admin page fills the semifinals from the standings and the later rounds from results; any team can be changed by hand. The "How it works" text on the Bracket tab comes from `tournament` in `data.js`.
- **Setup once:** run `supabase-setup.sql` in the SQL Editor, add each organizer under Authentication → Users (email + password) and make sure their email is in the `admins` table, then put the project URL and publishable key in `config.js`.

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
