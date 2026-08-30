# Database tooling delta

## ADDED Requirements

### Requirement: Single local database reset workflow
The repository MUST provide `npm run db:reset` as the sole documented npm workflow for recreating the configured local PostgreSQL development database. The command MUST drop the development database, create it, and apply Sequelize migrations. It MUST NOT execute seeders.

#### Scenario: Recreate a configured local database
- **Given** PostgreSQL is reachable with the configured development environment variables
- **When** a contributor runs `npm run db:reset`
- **Then** the development database is recreated and the versioned Sequelize migrations define its schema and constraints.

### Requirement: Migration-owned schema validation
Database constraints and validation rules that PostgreSQL can enforce MUST remain defined in Sequelize migrations rather than setup or API-validation scripts.

#### Scenario: Apply the initial schema
- **Given** an empty development database
- **When** the local database workflow applies migrations
- **Then** the migrated schema includes the PostgreSQL constraints declared by the initial migration.

### Requirement: Retire redundant local scripts
The repository MUST NOT retain the legacy database shell setup script or the API validation scripts as supported local database tooling.

#### Scenario: Discover local database setup
- **Given** a contributor reads the project documentation or npm scripts
- **When** they look for local database setup instructions
- **Then** they find only the `db:reset` migration workflow and no references to the retired scripts.
