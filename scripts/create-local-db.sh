#!/usr/bin/env bash
set -e

DB_NAME="${DB_NAME:-hallofbootcamp}"
DB_USER="${DB_USER:-admin}"
DB_PASSWORD="${DB_PASSWORD:-admin123}"

export PGPASSWORD="$DB_PASSWORD"

psql -h localhost -p 5432 -U "$DB_USER" -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$DB_NAME'" | grep -q 1 || psql -h localhost -p 5432 -U "$DB_USER" -d postgres -c "CREATE DATABASE \"$DB_NAME\";"

echo "Database ready: $DB_NAME"
