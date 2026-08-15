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

    if (origin && origin !== ALLOWED_ORIGIN) {
      return json({ error: "origin_not_allowed" }, 403, origin);
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
