# OpenSpec Project Setup

`openspec/` is the repository's sole specification and planning memory.

## Structure

- `config.yaml` — project defaults, workflow rules, and testing capabilities.
- `specs/<domain>/spec.md` — canonical, current specification for each domain.
- `changes/<change-name>/` — active change record: `state.yaml`, proposal, delta specs, design, tasks, and verification evidence.
- `changes/archive/YYYY-MM-DD-<change-name>/` — immutable audit trail for completed changes.

Do not create root-level `specs/` or `plan.md`. Multi-file, data, and API planning belongs in the active change's `design.md` and `tasks.md`.

## Current status

- Artifact store: OpenSpec
- Strict TDD: disabled
- Test runner: not detected
- Stack: Node.js + Express + Sequelize + PostgreSQL
