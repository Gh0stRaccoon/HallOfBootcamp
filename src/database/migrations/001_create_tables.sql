CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(120),
  bio TEXT,
  avatar_url VARCHAR(500),
  linked_in_url VARCHAR(500) UNIQUE,
  github_url VARCHAR(500) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cohorts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS participants (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cohort_id INTEGER NOT NULL REFERENCES cohorts(id) ON DELETE CASCADE,
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  left_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, cohort_id)
);

CREATE TABLE IF NOT EXISTS contributions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cohort_id INTEGER REFERENCES cohorts(id) ON DELETE SET NULL,
  project_context VARCHAR(255) NOT NULL,
  type VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE users
  ADD CONSTRAINT users_linkedin_url_format_ck
  CHECK (linked_in_url IS NULL OR linked_in_url ~ '^https?://');

ALTER TABLE users
  ADD CONSTRAINT users_github_url_format_ck
  CHECK (github_url IS NULL OR github_url ~ '^https?://');

CREATE UNIQUE INDEX IF NOT EXISTS users_linked_in_url_idx
ON users (linked_in_url)
WHERE linked_in_url IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS users_github_url_idx
ON users (github_url)
WHERE github_url IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS participants_active_cohort_idx
ON participants (user_id, cohort_id)
WHERE status = 'active';
