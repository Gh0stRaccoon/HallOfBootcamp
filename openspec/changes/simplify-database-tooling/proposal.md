# Proposal: Simplify local database tooling

## Problem statement
The repository exposes overlapping database setup and API validation scripts. They duplicate lifecycle responsibilities, can alter local data, and do not provide a single, documented path for recreating the PostgreSQL schema from Sequelize migrations.

## User value
Contributors can recreate the local PostgreSQL schema through one npm command, with the schema and database constraints defined by versioned Sequelize migrations.

## Proposed solution
Keep a single `db:reset` npm command that drops, creates, and migrates the configured development database. Remove standalone shell and API-validation scripts, their npm entries, and the unused seed flow. Keep PostgreSQL configuration aligned between the runtime connection and Sequelize CLI defaults.

## Affected modules
- `package.json`
- `.sequelizerc`
- `src/config/database.js`
- `src/database/`
- `README.md`, `CONTRIBUTING.md`, and `.github/pull_request_template.md`

## Risks
- `db:reset` is destructive and removes the configured development database.
- Sample data will no longer be inserted automatically because seeders are removed from the local setup flow.

## Rollback plan
Restore the removed scripts, seeder, npm entries, and documentation references from version control if a separate seed or API-validation workflow is later required.
