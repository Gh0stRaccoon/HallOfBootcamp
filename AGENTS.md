# HallOfBootcamp development guide

## Spec-driven workflow

`openspec/` is the repository's sole specification and planning memory.

For every non-trivial change:

1. Create or continue `openspec/changes/<change-name>/` and record the proposal in `proposal.md`.
2. Agree on user-visible behavior and acceptance criteria before implementation.
3. Write the change delta in `openspec/changes/<change-name>/specs/<domain>/spec.md`, and keep the canonical specification in `openspec/specs/<domain>/spec.md` as the source of truth.
4. For work spanning multiple files, data changes, or API changes, document the approach in `design.md` and executable work in `tasks.md`.
5. Implement and verify every acceptance criterion; keep `state.yaml`, `tasks.md`, and `verify-report.md` current.
6. Archive completed changes only after their delta has been merged into the canonical specification.

## Project conventions

- Runtime: Node.js with CommonJS modules.
- API framework: Express.
- Persistence: PostgreSQL through Sequelize.
- Never commit secrets; use environment variables for credentials and signing keys.
- Prefer small, testable modules and explicit validation at API boundaries.

## Contribution workflow

[CONTRIBUTING.md](CONTRIBUTING.md) is the single source of truth for issues, forks,
branches, commits, validation, and pull requests. Follow its branch convention:

```text
<type>/<issue-number>-<short-description>
```
