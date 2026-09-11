const ALLOWED_ORIGIN = "https://kevincl16.github.io";

const BOT_UA_PATTERN = /(?:bot|crawler|spider|slurp|bingpreview|facebookexternalhit|discordbot|telegrambot|whatsapp|headlesschrome|phantomjs|selenium|python-requests|python-urllib|curl\/|wget\/|go-http-client|apache-httpclient|lighthouse|pagespeed|uptimerobot|monitoring|scanner|zgrab|masscan)/i;

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
    :root { color-scheme: light; --paper: #f6f5f0; --ink: #20211e; --muted: #696a63; --line: #d8d7ce; }
    * { box-sizing: border-box; }
    body { margin: 0; color: var(--ink); background: var(--paper); font: 16px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    main { width: min(720px, calc(100% - 36px)); margin: 0 auto; padding: 72px 0; }
    h1 { margin: 0 0 16px; font: 400 42px/1.1 Georgia, "Times New Roman", serif; }
    a { color: inherit; }
    .muted { color: var(--muted); }
  </style>
</head>
<body>
  <main>
    <h1>Pageview counter</h1>
    <p class="muted">The private dashboard is hosted with the main site.</p>
    <p><a href="https://kevincl16.github.io/pageviews.html">Open analytics dashboard</a></p>
  </main>
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

function utcDate() {
  return new Date().toISOString().slice(0, 10);
}

function isAutomated(request) {
  const botManagement = request.cf && request.cf.botManagement;
  if (botManagement && botManagement.verifiedBot === true) return true;
  if (botManagement && typeof botManagement.score === "number" && botManagement.score <= 10) return true;

  const userAgent = request.headers.get("User-Agent") || "";
  return BOT_UA_PATTERN.test(userAgent);
}

function validVisitorId(value) {
  return typeof value === "string" && /^[A-Za-z0-9_-]{16,128}$/.test(value);
}

async function dailyVisitorHash(date, visitorId) {
  const bytes = new TextEncoder().encode(`${date}:${visitorId}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function buildDailyHistory(currentTotal, rows, uniqueRows, automatedRows, metricsStartDate) {
  const normalized = rows.map((row) => ({
    date: String(row.date),
    views: Number(row.views) || 0,
  }));
  const uniqueMap = new Map(uniqueRows.map((row) => [String(row.date), Number(row.visitors) || 0]));
  const automatedMap = new Map(automatedRows.map((row) => [String(row.date), Number(row.requests) || 0]));
  const recordedViews = normalized.reduce((sum, row) => sum + row.views, 0);
  let runningTotal = currentTotal - recordedViews;

  return normalized.map((row) => {
    const openingTotal = runningTotal;
    runningTotal += row.views;
    const advancedMetricsAvailable = Boolean(metricsStartDate) && row.date >= metricsStartDate;
    return {
      date: row.date,
      opening_total: openingTotal,
      views: row.views,
      closing_total: runningTotal,
      unique_visitors: advancedMetricsAvailable ? (uniqueMap.get(row.date) || 0) : null,
      automated_requests: advancedMetricsAvailable ? (automatedMap.get(row.date) || 0) : null,
    };
  });
}

async function parseVisitorId(request) {
  try {
    const body = await request.json();
    return validVisitorId(body && body.visitor_id) ? body.visitor_id : null;
  } catch (_) {
    return null;
  }
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

    if (url.pathname === "/health" && request.method === "GET") {
      return json({ ok: true, database: Boolean(env.DB) }, 200, origin);
    }

    if ((url.pathname === "/dashboard" || url.pathname === "/") && request.method === "GET") {
      return dashboard(origin);
    }

    if (url.pathname === "/hit" && request.method === "POST") {
      if (!env.DB) return json({ error: "database_not_configured" }, 503, origin);
      if (origin !== ALLOWED_ORIGIN) return json({ error: "origin_required" }, 403, origin);

      const date = utcDate();

      if (isAutomated(request)) {
        await env.DB.prepare(
          `INSERT INTO automated_requests (view_date, requests)
           VALUES (?, 1)
           ON CONFLICT(view_date) DO UPDATE SET requests = automated_requests.requests + 1`
        ).bind(date).run();
        return json({ ok: true, filtered: true }, 200, origin);
      }

      const { country, regionCode, region } = getRegion(request);
      const visitorId = await parseVisitorId(request);
      const visitorHash = visitorId ? await dailyVisitorHash(date, visitorId) : null;
      const statements = [
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
      ];

      if (visitorHash) {
        statements.push(
          env.DB.prepare(
            `INSERT OR IGNORE INTO daily_unique_visitors (view_date, visitor_hash)
             VALUES (?, ?)`
          ).bind(date, visitorHash)
        );
      }

      await env.DB.batch(statements);

      const total = await env.DB.prepare(
        "SELECT views FROM site_totals WHERE id = 1"
      ).first();

      return json({
        ok: true,
        filtered: false,
        total: total?.views ?? null,
        unique_recorded: Boolean(visitorHash),
      }, 200, origin);
    }

    if (url.pathname === "/summary" && request.method === "GET") {
      const auth = request.headers.get("Authorization");
      if (!env.SUMMARY_TOKEN || auth !== `Bearer ${env.SUMMARY_TOKEN}`) {
        return json({ error: "unauthorized" }, 401, origin);
      }
      if (!env.DB) return json({ error: "database_not_configured" }, 503, origin);

      const [total, regions, dailyRows, uniqueRows, automatedRows, automatedTotal, metricsStart] = await Promise.all([
        env.DB.prepare("SELECT views FROM site_totals WHERE id = 1").first(),
        env.DB.prepare(
          `SELECT country, region_code, region, SUM(views) AS views
           FROM regional_views
           GROUP BY country, region_code
           ORDER BY views DESC`
        ).all(),
        env.DB.prepare(
          `SELECT view_date AS date, SUM(views) AS views
           FROM regional_views
           GROUP BY view_date
           ORDER BY view_date ASC`
        ).all(),
        env.DB.prepare(
          `SELECT view_date AS date, COUNT(*) AS visitors
           FROM daily_unique_visitors
           GROUP BY view_date
           ORDER BY view_date ASC`
        ).all(),
        env.DB.prepare(
          `SELECT view_date AS date, requests
           FROM automated_requests
           ORDER BY view_date ASC`
        ).all(),
        env.DB.prepare(
          `SELECT COALESCE(SUM(requests), 0) AS requests
           FROM automated_requests`
        ).first(),
        env.DB.prepare(
          `SELECT value
           FROM analytics_meta
           WHERE key = 'advanced_metrics_start_date'`
        ).first(),
      ]);

      const currentTotal = Number(total?.views ?? 0);
      const metricsStartDate = metricsStart?.value ? String(metricsStart.value) : null;
      const daily = buildDailyHistory(
        currentTotal,
        dailyRows.results || [],
        uniqueRows.results || [],
        automatedRows.results || [],
        metricsStartDate
      );
      const latest = daily.length ? daily[daily.length - 1] : null;

      return json({
        total: currentTotal,
        regions: regions.results || [],
        daily,
        daily_timezone: "UTC",
        advanced_metrics_start_date: metricsStartDate,
        today_unique_visitors: latest?.unique_visitors ?? 0,
        filtered_automated_total: Number(automatedTotal?.requests ?? 0),
        privacy: {
          raw_ip_stored: false,
          user_agent_stored: false,
          visitor_id_stored: false,
          daily_hash_linkable_across_days: false,
        },
      }, 200, origin);
    }

    return json({ error: "not_found" }, 404, origin);
  },
};
