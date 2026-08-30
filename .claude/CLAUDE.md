# HallOfBootcamp

## Spec-driven workflow

`openspec/` is the repository's sole specification and planning memory.

For every non-trivial change:

1. Create or continue `openspec/changes/<change-name>/` and write `proposal.md`.
2. Agree on user-visible behavior and acceptance criteria before implementation.
3. Write the delta in `openspec/changes/<change-name>/specs/<domain>/spec.md`; maintain `openspec/specs/<domain>/spec.md` as the canonical source of truth.
4. For multi-file, data, or API work, create `design.md` and `tasks.md` in the change directory.
5. Implement and verify each acceptance criterion; keep `state.yaml`, `tasks.md`, and `verify-report.md` current.
6. Archive only after merging the accepted delta into the canonical specification.

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
