# Contributing to HallOfBootcamp

This guide takes you from an idea to a reviewable pull request. Follow it in order: an issue defines the work, a branch isolates it, OpenSpec records its intent, and the pull request makes it reviewable.

## Quick path

1. Find or open an issue.
2. Fork the repository and clone your fork.
3. Create one branch for that issue.
4. Describe non-trivial work in `openspec/` before implementing it.
5. Validate the change, commit it, push it, and open a pull request.

## Before you start

You need:

- Node.js 18 or newer.
- PostgreSQL running locally or available to your machine.
- Git and a GitHub account.
- A GitHub fork of [`Gh0stRaccoon/HallOfBootcamp`](https://github.com/Gh0stRaccoon/HallOfBootcamp).
- REST Client for VS Code is optional; the API collection is at [RESTClient/hallofbootcamp.http](RESTClient/hallofbootcamp.http).

Never commit `.env`, passwords, tokens, or other credentials.

## 1. Open or choose an issue

Every contribution starts with a GitHub issue. Search existing issues first to avoid duplicating work. If none describes the problem, create one with:

- a clear title;
- the problem and expected outcome;
- acceptance criteria when they are known.

Keep one issue focused on one outcome. Its number is required in your branch name and pull request.

## 2. Fork and clone

On GitHub, click **Fork** on the upstream repository. Then clone **your fork**, replacing `<your-github-user>` with your GitHub username:

```bash
git clone https://github.com/<your-github-user>/HallOfBootcamp.git
cd HallOfBootcamp
git remote add upstream https://github.com/Gh0stRaccoon/HallOfBootcamp.git
git remote -v
```

`origin` should point to your fork. `upstream` should point to the project repository. Before starting new work, update your local `main`:

```bash
git checkout main
git fetch upstream
git pull --ff-only upstream main
git push origin main
```

If `git pull --ff-only` stops, resolve the divergence deliberately; do not force-push or overwrite work you do not understand.

## 3. Create a branch

Create the branch from the updated `main`. The official format is:

```text
<type>/<issue-number>-<short-description>
```

Allowed types:

| Type | Use it for |
| --- | --- |
| `feature` | New user-visible functionality. |
| `fix` | A defect correction. |
| `docs` | Documentation only. |
| `refactor` | Internal improvement without observable behavior changes. |
| `chore` | Tooling, maintenance, or configuration. |
| `test` | Tests or validation only. |

Use lowercase kebab-case. Do not use spaces, accents, special characters, or invented issue numbers.

```bash
git checkout -b feature/12-user-profile
# or
git checkout -b fix/27-linkedin-validation
```

Do not push directly to `main`. One branch and one pull request should address one issue.

## 4. Prepare your local environment

Install dependencies and create your local environment file:

```bash
npm install
cp .env.example .env
```

Edit `.env` with credentials for a disposable local PostgreSQL database, then recreate the schema:

```bash
npm run db:reset
```

> **Warning:** `db:reset` drops the configured development database before creating it and applying Sequelize migrations. Never use it against data you need to keep.

Start the API when you need to work with it:

```bash
npm run dev
```

`GET /health` should return `{"status":"ok"}`. A fresh database has no demo data, so `GET /api/users` can correctly return `[]`.

## 5. Plan non-trivial changes with OpenSpec

`openspec/` is the repository's only specification and planning memory.

For a non-trivial change, create or continue `openspec/changes/<change-name>/` before implementation:

1. Record the intent in `proposal.md` and agree on visible behavior and acceptance criteria.
2. Add the delta specification at `specs/<domain>/spec.md`.
3. For multi-file, data, or API work, create `design.md` and `tasks.md`.
4. Keep `state.yaml`, `tasks.md`, and `verify-report.md` aligned with the implementation.
5. Merge accepted deltas into `openspec/specs/<domain>/spec.md` before archiving.

Read [openspec/README.md](openspec/README.md) for the directory structure. Do not create root-level `specs/` or `plan.md` files.

## 6. Implement and validate

Keep changes small, testable, and scoped to the issue. Validate before each commit and again before opening the pull request:

```bash
npm run lint:check
npm run fmt:check
git diff --check
```

Run `npm run db:reset` when your change affects migrations or the PostgreSQL schema, using only a disposable local database. Use [RESTClient/hallofbootcamp.http](RESTClient/hallofbootcamp.http) to exercise API behavior.

If you change an endpoint, HTTP method, request payload, validation, response, or observable API behavior, update the corresponding REST Client request or example in the same pull request.

## 7. Commit your work

Review the files first:

```bash
git status
git diff
```

Use Conventional Commits:

```text
<type>(<scope>): <description>
```

Examples:

```text
feat(api): add user registration endpoint
fix(db): resolve snake case mapping for sequelize models
docs(project): clarify contributor workflow
chore(tooling): configure oxlint and oxfmt
```

Stage only the files for the issue, then commit. Do not add attribution trailers or secrets.

```bash
git add <files-for-this-issue>
git commit -m "docs(project): clarify contributor workflow"
```

## 8. Push and open a pull request

Push your branch to your fork:

```bash
git push -u origin feature/12-user-profile
```

On GitHub, open a pull request from your branch in your fork into `Gh0stRaccoon/HallOfBootcamp:main`. Use the repository template and complete every relevant section.

Before requesting review, confirm:

- [ ] The PR links the issue with `Fixes #<issue-number>`.
- [ ] The branch follows `<type>/<issue-number>-<short-description>`.
- [ ] The PR is scoped to one issue.
- [ ] `npm run lint:check`, `npm run fmt:check`, and `git diff --check` pass.
- [ ] OpenSpec and REST Client documentation are updated when the change requires them.
- [ ] No secrets or unrelated files are included.

## Getting unstuck

Ask on the issue before making broad architectural changes or changing the agreed scope. Small, well-explained pull requests are easier to review, safer to merge, and better learning material for everyone.
