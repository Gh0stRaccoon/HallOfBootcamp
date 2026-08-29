# Hall Of Bootcamp participant and cohort management

## Summary
The system shall maintain a persistent record of bootcamp participants, their assigned cohort, and each user's profile and contributions within the same project.

## Problem
Bootcamp organizers need a reliable way to track who belongs to a cohort, how users are represented in the platform, and what each user has contributed to the project. Without this structure, participant data is fragmented and difficult to query or report on.

## Requirements

### Functional requirements
- The system MUST support creating and storing bootcamp cohorts.
- The system MUST allow a user to be linked to one or more cohort memberships, with the current cohort status tracked explicitly.
- The system MUST maintain a user profile with fields such as name, email, role, bio, avatar URL, LinkedIn profile URL, and GitHub profile URL.
- The system MUST allow contributions to be recorded for a user within the project context.
- The system MUST expose participant data in a way that can be filtered by cohort and user.
- The system MUST validate required fields for participant and profile creation.
- The system MUST validate LinkedIn and GitHub values as URL strings when provided, and SHOULD reject malformed URLs.

### Non-functional requirements
- The system SHOULD keep data access predictable and explicit.
- The system SHOULD protect against duplicate cohort registrations for the same user in the same active cohort.
- The system SHOULD keep API validation at boundary layers to reduce invalid persistence.

## Acceptance criteria

### Given a cohort exists
When a new participant is registered for that cohort
Then the system must associate the user with that cohort and store the membership record.

### Given a user profile is created
When the profile data is submitted without required fields
Then the system must reject the request with a clear validation error.

### Given a user profile includes social links
When the profile payload contains a LinkedIn or GitHub URL
Then the system must persist those fields and validate them as valid URLs.

### Given a user has contributions
When a contribution is recorded for that user
Then the system must persist the contribution and identify the associated project context.

### Given a cohort is selected
When a participant list is requested
Then the system must return only the users that belong to that cohort.

## Architecture
The system SHALL use MVC architecture with a clear separation of concerns and explicit responsibility boundaries. The project SHALL follow the SCREAM approach to make the design understandable and easy to evolve.

### Folder structure
```text
/
/app.js
/server.js
/src
/src/middlewares
/src/controllers
/src/routes
/src/helpers
/src/config
/src/etc
```

### SCREAM alignment
- S: Segregate responsibilities by layer and by feature.
- C: Centralize reusable logic in helpers, configuration, and service-style components.
- R: Route HTTP requests to controller actions only.
- E: Encapsulate business rules and validation in clear modules.
- A: Abstract persistence and external integrations behind stable interfaces.
- M: Make dependencies explicit and keep modules small and testable.

### Responsibilities by layer
- `src/routes`: define API endpoints and delegate to controllers.
- `src/controllers`: handle HTTP requests and delegate business logic.
- `src/middlewares`: validate payloads and enforce request hygiene.
- `src/helpers`: reusable utility functions and transformations.
- `src/config`: environment configuration and database setup.
- `app.js`: app bootstrap and middleware registration.
- `server.js`: server startup and port binding.

## Edge cases
- A user may attempt to join the same cohort more than once.
- A user may switch from one cohort to another.
- Contribution records may need to be preserved even if the user leaves a cohort.
- Profile fields may be partially empty for invited or incomplete accounts.
