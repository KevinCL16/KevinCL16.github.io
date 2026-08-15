CREATE TABLE IF NOT EXISTS site_totals (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  views INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO site_totals (id, views) VALUES (1, 4);

CREATE TABLE IF NOT EXISTS regional_views (
  view_date TEXT NOT NULL,
  country TEXT NOT NULL,
  region_code TEXT NOT NULL,
  region TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (view_date, country, region_code)
);
