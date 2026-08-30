# Tasks: Simplify local database tooling

## Tooling

- [x] 1.1 Keep `db:reset` as the single Sequelize/npm workflow for recreating the development database through migrations.
- [x] 1.2 Remove obsolete npm entries, standalone setup, and API validation scripts.
- [x] 1.3 Remove the unused seeder flow and its Sequelize CLI path.

## Configuration

- [x] 2.1 Align the runtime PostgreSQL fallback username with the Sequelize CLI and documented development configuration.
- [x] 2.2 Preserve migration-owned PostgreSQL constraints without changing the migration implementation.

## Documentation and verification

- [x] 3.1 Update contributor, README, database-layer, and pull-request guidance to document the single migration workflow.
- [x] 3.2 Perform structural readback without running database commands or tests.
