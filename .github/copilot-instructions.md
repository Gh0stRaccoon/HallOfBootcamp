# HallOfBootcamp AI development instructions

## Mission
Use a spec-driven workflow for non-trivial work.

## Project conventions
- Runtime: Node.js with CommonJS modules
- API framework: Express
- Persistence: PostgreSQL through Sequelize
- Never commit secrets; use environment variables for credentials and signing keys
- Prefer small, testable modules and explicit validation at API boundaries

## Required workflow for changes
1. `openspec/` is the repository's sole specification and planning memory.
2. Create or continue `openspec/changes/<change-name>/proposal.md` and agree on user-visible behavior and acceptance criteria before implementation.
3. Create or update a delta specification in `openspec/changes/<change-name>/specs/<domain>/spec.md`; maintain `openspec/specs/<domain>/spec.md` as the canonical source of truth.
4. For changes spanning multiple files, data changes, or API changes, create or update `design.md` and `tasks.md` in the change directory.
5. Implement the work, verify every acceptance criterion, and keep `state.yaml`, `tasks.md`, and `verify-report.md` aligned with the work.
6. Archive a completed change only after its accepted delta is merged into the canonical specification.

## OpenSpec and SDD
- Use the project OpenSpec structure under openspec/.
- Keep context concise and artifact-based.
- Prefer small, reviewable changes.
- When a change is risky, include rollback and impact analysis.

## Quality bar
- Validate behavior before claiming completion.
- Prefer explicit input validation and clear module boundaries.
- Use environment variables for configuration and secrets.
