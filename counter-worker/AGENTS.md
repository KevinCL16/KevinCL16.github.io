# Worker-only instructions

This directory is an independently deployed Cloudflare Worker. It is **not** part of the GitHub Pages deployment lifecycle.

Do not edit Worker runtime files for ordinary homepage, CV, blog, styling, navigation, or static-dashboard requests. Worker runtime changes require explicit user intent about the pageview backend or Cloudflare Worker behavior.

Runtime/config paths include:

- `src/**`
- `migrations/**`
- `wrangler.toml*`

If any runtime/config path changes, keep that change separate from unrelated site edits and tell the user to deploy it from the repository root with:

```powershell
cd counter-worker
npx wrangler deploy
```

A GitHub commit, push, or successful GitHub Pages build does not deploy this Worker. Do not claim deployment until Wrangler reports a successful upload/deploy. Do not change `SUMMARY_TOKEN` unless explicitly requested.
