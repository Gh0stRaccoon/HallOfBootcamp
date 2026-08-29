# Proposal: Hall Of Bootcamp participant and cohort management

## Problem statement
The project currently has no domain model for bootcamp participants, cohort membership, or contributions. This makes it impossible to track who belongs to a specific bootcamp cohort and what each user contributed to the same project.

## User value
Organizers need a stable structure to maintain who participates in each cohort and to represent each user's profile and contributions within the project. This enables reporting, cohort assignment, and contribution tracking from a single source of truth.

## Proposed solution
Introduce a normalized data model with:
- Users
- Profiles
- Cohorts
- Participant membership records
- Contribution entries

This will support the primary use cases of cohort management and contribution tracking while keeping validation and persistence logic explicit.

## Affected modules
- backend models and services
- API routes for cohort, profile, and contribution operations
- validation middleware
- database schema and migrations

## Risks
- Ambiguous user identity if users are not clearly separated from participants
- Duplicate cohort registrations if membership rules are not enforced
- Contribution history drift if records are not tied to a stable project context

## Rollback plan
If the implementation becomes unstable, revert the new migration and route additions in small batches, keep the schema isolated, and preserve the decision log for rework. The change should be introduced incrementally instead of as a single large migration.

## Recommendation
Proceed with a normalized model and keep the first implementation focused on data structure, validation, and CRUD flows. This reduces complexity while still delivering a strong foundation for future reporting features.
