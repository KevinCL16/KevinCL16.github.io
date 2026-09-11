CREATE TABLE IF NOT EXISTS daily_unique_visitors (
  view_date TEXT NOT NULL,
  visitor_hash TEXT NOT NULL,
  PRIMARY KEY (view_date, visitor_hash)
);

CREATE INDEX IF NOT EXISTS idx_daily_unique_visitors_date
  ON daily_unique_visitors (view_date);

CREATE TABLE IF NOT EXISTS automated_requests (
  view_date TEXT PRIMARY KEY,
  requests INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS analytics_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

INSERT OR IGNORE INTO analytics_meta (key, value)
VALUES ('advanced_metrics_start_date', date('now'));
