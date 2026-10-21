# La Víbora Invitational portal

Static site for a padel weekend in Cabo San Lucas, October 23–25, 2026. Live at https://laviborainvitational.netlify.app. The organizer, Paul Arenson, is not a developer: explain things plainly, lead with a recommendation, and keep technical detail light.

## How this project works

- `data.js` holds all content: players, pros, schedule, venues, essentials, contacts, links. Almost every request is an edit here.
- `index.html` is the whole app (design and behavior). Touch it only for layout or feature changes.
- Netlify deploys automatically from the `main` branch on GitHub. **Every push is a deploy and costs free-plan credits**, so batch changes and push once per session, or when the organizer says "deploy".
- The Gallery and Bracket tabs read from a Supabase backend (`config.js`, `backend.js`); the organizer edits the bracket on `admin.html`. Backend schema is in `supabase-setup.sql`. Nothing in the repo needs to change for photos or scores.
- Full details in `README.md`.

## Rules for editing data.js

- Keep `players` sorted alphabetically by last name. `pros` stay in the order given.
- No role tags: leave `tag: ""` unless the organizer explicitly asks for a label.
- Keep the organizer's wording exactly. Only tidy whitespace (double spaces, trailing spaces) and add a missing final period.
- A schedule item may carry an optional `menu` object (title + courses, each with dish / tags / desc); copy the Saturday dinner's shape.
- Schedule times are 24h Cabo local time. `where` must be a key in `venues`, or `""` for no location.
- Before committing, validate: run `node -e "global.window={}; require('./data.js'); console.log('ok')"` and check for overlapping times, end-before-start, and unknown venue keys. Report anything odd to the organizer rather than guessing.

## Commits

Commit messages end with: `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`
