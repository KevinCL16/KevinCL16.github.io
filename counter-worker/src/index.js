const ALLOWED_ORIGIN = "https://kevincl16.github.io";

function corsHeaders(origin) {
  const headers = {
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow",
  };

  if (origin === ALLOWED_ORIGIN) {
    headers["Access-Control-Allow-Origin"] = ALLOWED_ORIGIN;
    headers["Vary"] = "Origin";
  }

  return headers;
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function dashboard(origin) {
  return new Response(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Pageview counter</title>
  <style>
    :root { color-scheme: light; --paper: #f6f5f0; --ink: #20211e; --muted: #696a63; --line: #d8d7ce; --accent: #a4573f; }
    * { box-sizing: border-box; }
    body { margin: 0; color: var(--ink); background: var(--paper); font: 16px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    main { width: min(760px, calc(100% - 36px)); margin: 0 auto; padding: 72px 0; }
    h1 { margin: 0; font: 400 42px/1.1 Georgia, "Times New Roman", serif; letter-spacing: -.04em; }
    .eyebrow { margin: 0 0 18px; color: var(--accent); font-size: 11px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
    .muted { color: var(--muted); }
    form { display: flex; gap: 10px; margin-top: 28px; }
    input, button { border: 1px solid var(--line); border-radius: 6px; padding: 10px 13px; font: inherit; }
    input { min-width: 280px; background: #fffefa; }
    button { color: #fffefa; border-color: var(--ink); background: var(--ink); cursor: pointer; }
    button:hover { background: var(--accent); border-color: var(--accent); }
    #error { min-height: 25px; color: var(--accent); }
    .summary { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin: 36px 0 42px; }
    .metric { padding: 20px; border: 1px solid var(--line); background: #fffefa; }
    .metric-label { color: var(--muted); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; }
    .metric-value { margin-top: 5px; font: 400 42px/1 Georgia, "Times New Roman", serif; }
    table { width: 100%; border-collapse: collapse; margin-top: 18px; }
    th, td { padding: 11px 8px; border-bottom: 1px solid var(--line); text-align: left; }
    th { color: var(--muted); font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
    td:last-child, th:last-child { text-align: right; }
    @media (max-width: 560px) { main { padding: 44px 0; } h1 { font-size: 36px; } form { display: block; } input { width: 100%; } button { margin-top: 10px; } .summary { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <main>
    <p class="eyebrow">Private site analytics</p>
    <h1>Pageview counter</h1>
    <p class="muted">Lifetime views grouped by country and first-level region.</p>
    <form id="login-form">
      <input id="token" type="password" autocomplete="off" placeholder="SUMMARY_TOKEN" required>
      <button type="submit">View statistics</button>
    </form>
    <p id="error" role="alert"></p>
    <section id="stats" hidden>
      <div class="summary">
        <div class="metric"><div class="metric-label">Lifetime views</div><div class="metric-value" id="total">—</div></div>
        <div class="metric"><div class="metric-label">Regions</div><div class="metric-value" id="region-count">—</div></div>
      </div>
      <h2>Views by region</h2>
      <table>
        <thead><tr><th>Country</th><th>State / province</th><th>Views</th></tr></thead>
        <tbody id="regions"></tbody>
      </table>
    </section>
  </main>
  <script>
    const form = document.querySelector('#login-form');
    const tokenInput = document.querySelector('#token');
    const stats = document.querySelector('#stats');
    const error = document.querySelector('#error');
    const total = document.querySelector('#total');
    const regionCount = document.querySelector('#region-count');
    const regions = document.querySelector('#regions');

    async function loadStatistics(token) {
      const response = await fetch('/summary', { headers: { Authorization: 'Bearer ' + token } });
      if (!response.ok) throw new Error('The token was not accepted.');
      return response.json();
    }

    function render(data) {
      total.textContent = data.total;
      regionCount.textContent = data.regions.length;
      regions.replaceChildren();
      data.regions.forEach(function (item) {
        const row = document.createElement('tr');
        [item.country, item.region, item.views].forEach(function (value) {
          const cell = document.createElement('td');
          cell.textContent = value;
          row.appendChild(cell);
        });
        regions.appendChild(row);
      });
      stats.hidden = false;
      error.textContent = '';
    }

    async function submitToken(token) {
      try {
        render(await loadStatistics(token));
        sessionStorage.setItem('pageview-summary-token', token);
      } catch (exception) {
        sessionStorage.removeItem('pageview-summary-token');
        stats.hidden = true;
        error.textContent = exception.message;
      }
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      submitToken(tokenInput.value);
    });

    const savedToken = sessionStorage.getItem('pageview-summary-token');
    if (savedToken) {
      tokenInput.value = savedToken;
      submitToken(savedToken);
    }
  </script>
</body>
</html>`, {
    status: 200,
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

function getRegion(request) {
  const cf = request.cf || {};
  const country = String(cf.country || "XX").toUpperCase();
  const regionCode = String(cf.regionCode || "").trim().toUpperCase() || "UNKNOWN";
  const region = String(cf.region || "").trim() || regionCode;

  return { country, regionCode, region };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (origin && origin !== ALLOWED_ORIGIN && origin !== url.origin) {
      return json({ error: "origin_not_allowed" }, 403, origin);
    }

    if (url.pathname === "/dashboard" && request.method === "GET") {
      return dashboard(origin);
    }

    if (url.pathname === "/hit" && request.method === "POST") {
      if (!env.DB) return json({ error: "database_not_configured" }, 503, origin);

      const { country, regionCode, region } = getRegion(request);
      const date = new Date().toISOString().slice(0, 10);

      await env.DB.batch([
        env.DB.prepare(
          `INSERT INTO site_totals (id, views)
           VALUES (1, 1)
           ON CONFLICT(id) DO UPDATE SET views = site_totals.views + 1`
        ),
        env.DB.prepare(
          `INSERT INTO regional_views (view_date, country, region_code, region, views)
           VALUES (?, ?, ?, ?, 1)
           ON CONFLICT(view_date, country, region_code)
           DO UPDATE SET views = regional_views.views + 1, region = excluded.region`
        ).bind(date, country, regionCode, region),
      ]);

      const total = await env.DB.prepare(
        "SELECT views FROM site_totals WHERE id = 1"
      ).first();

      return json({ ok: true, total: total?.views ?? null }, 200, origin);
    }

    if (url.pathname === "/summary" && request.method === "GET") {
      const auth = request.headers.get("Authorization");
      if (!env.SUMMARY_TOKEN || auth !== `Bearer ${env.SUMMARY_TOKEN}`) {
        return json({ error: "unauthorized" }, 401, origin);
      }

      const total = await env.DB.prepare(
        "SELECT views FROM site_totals WHERE id = 1"
      ).first();
      const regions = await env.DB.prepare(
        `SELECT country, region_code, region, SUM(views) AS views
         FROM regional_views
         GROUP BY country, region_code
         ORDER BY views DESC`
      ).all();

      return json({
        total: total?.views ?? 0,
        regions: regions.results || [],
      }, 200, origin);
    }

    return json({ error: "not_found" }, 404, origin);
  },
};
