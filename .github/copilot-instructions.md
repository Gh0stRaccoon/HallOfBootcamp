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
1. Create or update a specification in specs/<feature-name>/spec.md.
2. Agree on user-visible behavior and acceptance criteria before implementation.
3. Create or update a plan in plan.md when the change spans multiple files, data changes, or API changes.
4. Implement the work and verify each acceptance criterion.
5. Keep the spec aligned with the real implementation.

## OpenSpec and SDD
- Use the project OpenSpec structure under openspec/.
- Keep context concise and artifact-based.
- Prefer small, reviewable changes.
- When a change is risky, include rollback and impact analysis.

## Quality bar
- Validate behavior before claiming completion.
- Prefer explicit input validation and clear module boundaries.
- Use environment variables for configuration and secrets.
