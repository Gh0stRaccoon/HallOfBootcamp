# Delta: Bootcamp participant management

## ADDED Requirements

### Requirement: Cohort persistence
The system MUST support creating and storing bootcamp cohorts.

#### Scenario: Create a cohort
- **Given** valid cohort data
- **When** a cohort creation request is processed
- **Then** the system stores the cohort and makes it available for later queries.

### Requirement: Cohort membership lifecycle
The system MUST allow a user to be linked to one or more cohort memberships and MUST track each membership's current status explicitly.

#### Scenario: Register a participant in a cohort
- **Given** a cohort exists
- **When** a new participant is registered for that cohort
- **Then** the system associates the user with that cohort and stores the membership record.

#### Scenario: Prevent duplicate active membership
- **Given** a user already has an active membership in a cohort
- **When** another active membership for that same user and cohort is requested
- **Then** the system rejects the duplicate registration.

#### Scenario: Preserve membership changes
- **Given** a user changes cohorts
- **When** the new membership is recorded
- **Then** the previous membership state remains explicitly trackable.

### Requirement: User profile data
The system MUST maintain a user profile containing name, email, role, bio, avatar URL, LinkedIn profile URL, and GitHub profile URL as applicable to the request.

#### Scenario: Reject an incomplete required profile
- **Given** a user profile creation request
- **When** required fields are absent
- **Then** the system rejects the request with a clear validation error.

#### Scenario: Validate social profile links
- **Given** a user profile payload contains a LinkedIn or GitHub URL
- **When** the payload is processed
- **Then** the system validates each provided value as a URL string and persists valid values.

#### Scenario: Reject a malformed social profile link
- **Given** a user profile payload contains a malformed LinkedIn or GitHub value
- **When** the payload is processed
- **Then** the system rejects the malformed value.

### Requirement: Contributions
The system MUST allow contributions to be recorded for a user within a project context.

#### Scenario: Record a contribution
- **Given** a user exists
- **When** a contribution is recorded with project context
- **Then** the system persists the contribution and identifies the associated project context.

#### Scenario: Preserve contribution history after membership changes
- **Given** a user leaves a cohort after recording contributions
- **When** their membership state changes
- **Then** existing contribution records remain preserved.

### Requirement: Participant queries
The system MUST expose participant data that can be filtered by cohort and user.

#### Scenario: Filter participants by cohort
- **Given** a cohort is selected
- **When** a participant list is requested for that cohort
- **Then** the system returns only users that belong to that cohort.

### Requirement: Boundary validation and persistence safety
The system MUST validate required fields for participant and profile creation. It SHOULD keep data access predictable and explicit, protect against duplicate active cohort registrations, and validate API payloads before persistence.

#### Scenario: Reject an invalid participant payload
- **Given** a participant creation request missing required data
- **When** the request reaches the API boundary
- **Then** the system rejects it before creating invalid persistence records.
