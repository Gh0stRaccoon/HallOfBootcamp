# Database layer

## Local development database

Use the single supported local database workflow from the repository root:

```bash
npm run db:reset
```

The command drops the configured `development` PostgreSQL database, creates it again, and applies every Sequelize migration. It is destructive and must only target disposable local data.

## Schema ownership

`migrations/` is the source of truth for the PostgreSQL schema and constraints. The initial migration creates the users, cohorts, participants, and contributions tables, including unique, foreign-key, URL-format, and active-membership constraints.

No seed data is applied by the local database workflow.
