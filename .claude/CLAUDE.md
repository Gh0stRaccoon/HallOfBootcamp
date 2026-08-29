# HallOfBootcamp

## Spec-driven workflow

For every non-trivial change:

1. Create specs/<feature-name>/spec.md from the project template.
2. Agree on the user-visible behavior and acceptance criteria before implementation.
3. Create plan.md from the project plan template when the work spans multiple files, data changes, or API changes.
4. Implement and verify each acceptance criterion.
5. Keep the spec updated when the agreed scope changes.

## Project conventions
- Runtime: Node.js with CommonJS modules
- API framework: Express
- Persistence: PostgreSQL through Sequelize
- Never commit secrets; use environment variables for credentials and signing keys
- Prefer small, testable modules and explicit validation at API boundaries

## Development preferences
- Favor simple, explicit APIs and small modules
- Preserve deterministic behavior and clean separation of concerns
- Keep specs and implementation aligned
