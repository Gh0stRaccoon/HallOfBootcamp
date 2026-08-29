# HallOfBootcamp development guide

## Spec-driven workflow

For every non-trivial change:

1. Create `specs/<feature-name>/spec.md` from `specs/templates/spec-template.md`.
2. Agree on the user-visible behavior and acceptance criteria before implementation.
3. Create `plan.md` from `specs/templates/plan-template.md` when the work spans multiple files, data changes, or API changes.
4. Implement and verify every acceptance criterion.
5. Keep the spec updated when the agreed scope changes.

## Project conventions

- Runtime: Node.js with CommonJS modules.
- API framework: Express.
- Persistence: PostgreSQL through Sequelize.
- Never commit secrets; use environment variables for credentials and signing keys.
- Prefer small, testable modules and explicit validation at API boundaries.

