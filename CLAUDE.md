# CLAUDE.md

This file provides guidance to AI assistants (Claude and others) working on this repository.

## Project Overview

**Repository:** `-auapw1`
**Project Name:** AUTOPARTS
**License:** Apache 2.0

This is an early-stage repository for an AUTOPARTS application. Based on the `.gitignore` configuration, the project is intended to be built on **ExpressionEngine** (a PHP-based CMS platform). The repository is currently in its initial scaffolding state — no application source code has been committed yet.

## Repository Structure

```
.
├── .github/
│   └── workflows/
│       └── blank.yml       # Placeholder CI workflow (not yet configured)
├── .gitignore              # Ignores EE config, image caches, OS files
├── LICENSE                 # Apache License 2.0
└── README.md               # Minimal project identifier
```

## Technology Stack

- **Platform:** ExpressionEngine (PHP CMS) — inferred from `.gitignore` patterns
- **CI/CD:** GitHub Actions (placeholder workflow configured)
- **Default branch:** `master`

## Expected Project Conventions (ExpressionEngine)

Based on the `.gitignore`, the project will follow a standard ExpressionEngine directory layout:

- `system/expressionengine/config/database.php` — database credentials (**never commit**)
- `system/expressionengine/config/config.php` — application config (**never commit**)
- `images/` — user-uploaded images (subdirectories excluded from git)
- `*/expressionengine/cache/` — cache directories (**never commit**)

## Security Rules

The following files must **never** be committed to the repository:

| File | Reason |
|------|--------|
| `system/expressionengine/config/database.php` | Contains DB credentials |
| `system/expressionengine/config/config.php` | Contains app secrets |
| `images/avatars/`, `images/captchas/`, etc. | User-generated content |
| `sized/`, `thumbs/`, `_thumbs/` | Generated image caches |

## Git Workflow

### Branches

- `master` — primary/default branch
- `claude/*` — branches used by AI assistants (e.g., `claude/claude-md-mmiwb4i1yyb02q9h-C3Re9`)

### Commit Practices

- Write clear, descriptive commit messages in imperative mood (e.g., "Add product listing template")
- Keep commits focused on a single concern
- Never commit sensitive configuration files

### CI/CD

The `.github/workflows/blank.yml` workflow is a template placeholder. It is currently configured to trigger on pushes/PRs to `main`, but the repository's default branch is `master`. When setting up real CI:

1. Update `branches: [ "main" ]` to `branches: [ "master" ]` (or add both)
2. Replace placeholder `echo` steps with actual build, test, and lint commands

## Development Setup

No build system or dependency files exist yet. When the application code is added:

1. Follow ExpressionEngine's installation guide for local setup
2. Copy `database.php` and `config.php` from a template — **do not commit real values**
3. Use environment variables or a `.env` file for secrets where possible

## Working with This Repository

### When adding code

- Keep sensitive config files out of version control (already enforced by `.gitignore`)
- Add a proper CI workflow tailored to the actual tech stack when source code is introduced
- Update this `CLAUDE.md` as the project evolves

### When asked to set up the project

- Verify ExpressionEngine version requirements before recommending dependencies
- Check that `.gitignore` covers all generated/sensitive files for the EE version in use
- The CI workflow needs to be configured with real steps before it provides any value

## Notes for AI Assistants

- This repository is in a **pre-code state** — there are no source files, tests, or build scripts yet
- Do not assume any specific PHP version, EE version, or dependency set without confirmation
- When source code is first added, update this file with actual build commands, test commands, and linting conventions
- The GitHub Actions workflow targets `main` but the repo uses `master` — flag this inconsistency to the user if working on CI configuration
