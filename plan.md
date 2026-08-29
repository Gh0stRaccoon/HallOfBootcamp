# Plan

## Goal
Create the foundational data model and API structure for Hall Of Bootcamp so participants, cohorts, profiles, social links, and user contributions can be stored and queried reliably using MVC with a SCREAM-aligned organization.

## Scope
### In scope
- Cohort model and lifecycle
- Participant assignment and membership tracking
- User profile model with LinkedIn and GitHub fields
- Contribution records linked to user and project context
- Basic validation and database constraints
- MVC folder structure under `/src` and bootstrap files at the project root

### Out of scope
- Payment flows
- Email notifications
- Frontend UI implementation
- Advanced analytics dashboards

## Impacted areas
- Express API routes and controllers
- Sequelize models and associations
- PostgreSQL schema and migration setup
- Validation middleware and error handling
- `/src` organization by responsibilities: routes, controllers, middlewares, helpers, config, and etc
- Root bootstrap files: `/app.js` and `/server.js`

## Work plan
1. Define the database schema for users, profiles, cohorts, participants, and contributions, including LinkedIn and GitHub URLs.
2. Implement Sequelize models and relations under a clearly separated MVC structure.
3. Add API endpoints for cohort creation, participant enrollment, profile management, and contribution creation.
4. Validate required payloads, URL formats, and duplicate membership edge cases.
5. Run verification checks and confirm the contract matches the specification.

## Risks and rollback
- Risk: data duplication between user and participant records
- Risk: stale cohort membership if users switch cohorts without explicit state handling
- Rollback: preserve migrations in small, reversible batches and avoid destructive database changes without backup

## Acceptance checklist
- [ ] Core models are in place for cohorts, users, profiles, participants, and contributions
- [ ] Validation covers required fields and duplicate registrations
- [ ] API flows match the acceptance criteria defined in the specification
- [ ] Verification is completed with the available project tooling
