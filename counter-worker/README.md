# Permanent pageview counter

> **Deployment boundary:** this Cloudflare Worker is independent of the GitHub Pages site. Ordinary homepage/CV/blog/style changes must not modify `counter-worker/src/**`, `counter-worker/migrations/**`, or Worker config. A GitHub push does not deploy the Worker. After an intentional Worker runtime change, apply any new D1 migrations and then deploy with Wrangler.

This Worker counts successful page loads for `https://kevincl16.github.io` and stores privacy-preserving aggregate analytics:

- one lifetime pageview total, seeded at the original baseline of 4 views;
- daily pageviews grouped by country and first-level region/state/province;
- approximate daily unique visitors from a browser-generated random ID;
- filtered automated requests from strong bot/headless/crawler signals;
- no raw IP address, user-agent, page URL, or raw visitor identifier.

The browser keeps a random anonymous visitor ID in `localStorage`. The Worker never stores that ID directly. It hashes `UTC date + visitor ID` with SHA-256 and stores only the daily hash, so the stored value cannot be used to link the same browser across different days. If localStorage is unavailable, the pageview is still counted but it does not contribute to the approximate unique count.

Bot filtering uses Cloudflare bot-management signals when available and conservative user-agent heuristics for known crawlers, headless browsers, command-line clients, scanners, and monitors. User agents are inspected only in memory and are not written to D1. Filtered requests are excluded from lifetime pageviews and regional counts after advanced tracking begins.

The Worker reads `request.cf.country`, `request.cf.regionCode`, and `request.cf.region`. Cloudflare derives these fields from the request IP, so a VPN/proxy is represented by its exit location.

## Deploy

From `counter-worker/`:

1. Apply any pending D1 migrations:

   ```bash
   npx wrangler d1 migrations apply kevincl16-pageviews --remote
   ```

2. Deploy the Worker:

   ```bash
   npx wrangler deploy
   ```

3. If the summary secret has not been configured, set it separately:

   ```bash
   npx wrangler secret put SUMMARY_TOKEN
   ```

The public site calls the deployed Worker URL ending in `/hit`. The private dashboard lives at `https://kevincl16.github.io/pageviews.html`; its token is kept in session storage and is not placed in the URL.

The public page supports `?analytics=off` as a browser-level opt-out. That disables both Cloudflare Web Analytics and this counter, and removes the anonymous visitor ID from local storage. `?analytics=on` re-enables analytics and creates a fresh random visitor ID on the next counted page load.
