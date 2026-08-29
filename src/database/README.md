# Database layer

## Migration files
The SQL migration files in this directory define the PostgreSQL schema used by Hall Of Bootcamp.

## Initial migration
- `001_create_tables.sql` creates the users, cohorts, participants, and contributions tables.

## Rules enforced
- User email is unique.
- LinkedIn and GitHub URLs are unique when provided.
- LinkedIn and GitHub values must use http or https when set.
- A user cannot be enrolled twice in the same cohort at the same time.
