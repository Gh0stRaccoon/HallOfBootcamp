# Design: Hall Of Bootcamp participant and cohort management

## Objective
Define the architecture and responsibilities for the first implementation of cohort, profile, and contribution management using MVC with SCREAM conventions.

## Architectural approach
We will implement a layered MVC structure to keep the project readable and easy to evolve.

### Root structure
```text
/
/app.js
/server.js
/src
/src/config
/src/controllers
/src/helpers
/src/middlewares
/src/routes
/src/etc
```

### SCREAM mapping
- Segregate: each folder owns a specific responsibility.
- Centralize: config and helpers are shared utilities, not duplicated logic.
- Route: route files define HTTP entry points only.
- Encapsulate: controllers and validation middleware isolate business flow and payload constraints.
- Abstract: persistence through Sequelize models keeps DB logic separate from request handling.
- Make dependencies explicit: routes call controllers; controllers call model/service logic; middleware validates inputs before logic runs.

## Layer responsibilities

### App bootstrap
- `app.js`: builds the Express application, loads global middleware, and mounts routes.
- `server.js`: starts the HTTP server and reads the port from environment configuration.

### `src/config`
- Environment variables
- Database connection configuration
- Sequelize initialization
- Shared app constants

### `src/routes`
- `users.routes.js`
- `cohorts.routes.js`
- `participants.routes.js`
- `contributions.routes.js`
- route definitions only, no business logic

### `src/controllers`
- `users.controller.js`
- `cohorts.controller.js`
- `participants.controller.js`
- `contributions.controller.js`
- request parsing, status handling, and orchestration of model operations

### `src/middlewares`
- payload validation
- duplicate membership checks
- URL validation for LinkedIn and GitHub fields
- auth guard placeholders if needed in future iterations

### `src/helpers`
- formatters
- validators
- normalization helpers
- string sanitization utilities

### `src/etc`
- shared constants, enums, or additional app-level modules not yet classified elsewhere
- future feature expansions that do not fit a first-pass module set

## Data model
### User
- id
- name
- email
- role
- bio
- avatarUrl
- linkedInUrl
- githubUrl
- createdAt
- updatedAt

### Cohort
- id
- name
- slug
- startDate
- endDate
- createdAt
- updatedAt

### Participant
- id
- userId
- cohortId
- status
- joinedAt
- leftAt
- createdAt
- updatedAt

### Contribution
- id
- userId
- cohortId
- projectContext
- type
- description
- createdAt
- updatedAt

## Validation rules
- Required fields must be present before inserting or updating records.
- LinkedIn and GitHub URLs must be valid URL strings if present.
- A user cannot join the same active cohort twice.
- If user changes cohort, the previous membership state should be tracked explicitly.

## Future extension points
- Add auth and authorization middleware.
- Add reporting endpoints grouped by cohort and user statistics.
- Add pagination and filtering for participant listing and contribution queries.
- Add event logging for membership changes and contribution registration.

## Risks and mitigations
- Risk: model ambiguity between user and participant roles.
  - Mitigation: keep user identity as the canonical account and participant as the cohort membership record.
- Risk: duplicate contribution data.
  - Mitigation: validate projectContext and dedupe rules before persisting.
- Risk: social links malformed.
  - Mitigation: validate URLs in middleware before they reach persistence logic.
