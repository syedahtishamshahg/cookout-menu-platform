CREATE TABLE IF NOT EXISTS admin_users (
 id TEXT PRIMARY KEY,
 email TEXT NOT NULL UNIQUE,
 role TEXT NOT NULL DEFAULT 'editor',
 status TEXT NOT NULL DEFAULT 'active',
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 last_login_at TEXT
);
CREATE TABLE IF NOT EXISTS review_queue (
 id TEXT PRIMARY KEY,
 review_type TEXT NOT NULL,
 entity_id TEXT NOT NULL,
 title TEXT NOT NULL,
 source_id TEXT,
 submitted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 status TEXT NOT NULL DEFAULT 'pending',
 reviewer_id TEXT,
 reviewed_at TEXT,
 notes TEXT
);
CREATE TABLE IF NOT EXISTS audit_logs (
 id TEXT PRIMARY KEY,
 actor_id TEXT,
 action TEXT NOT NULL,
 entity_type TEXT NOT NULL,
 entity_id TEXT NOT NULL,
 before_json TEXT,
 after_json TEXT,
 reason TEXT,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_review_status ON review_queue(status,submitted_at);
CREATE INDEX IF NOT EXISTS idx_audit_entity ON audit_logs(entity_type,entity_id,created_at);
