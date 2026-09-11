# Repository operating boundary

This repository contains two independently deployed systems:

1. The GitHub Pages site (`index.html`, `styles.css`, `script.js`, `cv.html`, blog pages, `pageviews.html`, and `assets/`).
2. The Cloudflare pageview Worker under `counter-worker/`.

## Static-site work

For homepage, CV, writing/blog, styling, navigation, or static analytics-dashboard changes, **do not modify the Cloudflare Worker runtime**. In particular, leave these untouched unless the user explicitly asks for Worker/backend behavior:

- `counter-worker/src/**`
- `counter-worker/migrations/**`
- `counter-worker/wrangler.toml*`

`pageviews.html` is part of the static site and may be edited independently. The stable production endpoint in `script.js` may be used by the site without changing Worker source.

Before finishing a normal site update, check the changed paths and confirm that no Worker runtime path above was modified.

## Worker work

Only change the Worker runtime when the request explicitly concerns the pageview backend, D1 storage, Worker routes, CORS, counter API, or another Worker-side behavior.

Worker changes must be kept separate from ordinary site changes whenever practical. A GitHub push or GitHub Pages build **does not deploy the Worker**.

After any Worker runtime change, explicitly tell the user to run exactly:

```powershell
cd counter-worker
npx wrangler deploy
```

Do not imply that the Worker is live until that command has succeeded. Do not rotate or overwrite `SUMMARY_TOKEN` unless the user explicitly asks to do so.
