# Permanent pageview counter

This Worker counts page loads for `https://kevincl16.github.io` and stores only aggregated data:

- one lifetime total, seeded at the current baseline of 4 views;
- daily counts grouped by country and first-level region/state/province;
- no raw IP address, user-agent, page URL, or visitor identifier.

The Worker reads `request.cf.country`, `request.cf.regionCode`, and `request.cf.region`. Cloudflare exposes these geolocation fields to Workers from the visitor IP. The two D1 updates run in one batch so the lifetime total and regional count move together.

## Deploy

1. Create a D1 database named `kevincl16-pageviews`.
2. Copy `wrangler.toml.example` to `wrangler.toml` and fill in the D1 `database_id`.
3. Apply the initial migration:

   ```bash
   npx wrangler d1 migrations apply kevincl16-pageviews --remote
   ```

4. Set an administrative token for the summary endpoint:

   ```bash
   npx wrangler secret put SUMMARY_TOKEN
   ```

5. Deploy the Worker:

   ```bash
   npx wrangler deploy
   ```

6. Put the deployed Worker URL ending in `/hit` into `pageviewCounterEndpoint` in the site's `script.js`.

The summary endpoint is not called by the public page. For a browser view, open `https://YOUR_WORKER_HOST/dashboard` and enter the `SUMMARY_TOKEN`; the token is kept in session storage and is not put into the URL. The raw API can also be queried with the secret token:

```bash
curl https://YOUR_WORKER_HOST/summary \
  -H 'Authorization: Bearer YOUR_SUMMARY_TOKEN'
```

The public page already treats `?analytics=off` as a local opt-out. That path returns before both Cloudflare Web Analytics and this counter are loaded, so the owner's opted-out visits are excluded from both systems.
