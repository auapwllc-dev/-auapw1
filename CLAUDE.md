# CLAUDE.md

This file provides guidance to AI assistants (Claude and others) working with this repository.

## Project Overview

**Name**: AUTOPARTS
**Description**: Early-stage project repository. No application code has been added yet — the repository currently contains only project scaffolding and configuration templates.

The `.gitignore` references ExpressionEngine CMS paths, suggesting the project may evolve into an ExpressionEngine-based application, but this has not been implemented yet.

## Repository Structure

```
/
├── .github/
│   └── workflows/
│       └── blank.yml        # GitHub Actions CI template (placeholder)
├── .gitignore                # Ignores macOS artifacts, EE config, image caches
├── LICENSE                   # Apache 2.0
└── README.md                 # Minimal project stub
```

## Technology Stack

No application stack has been established yet. The `.gitignore` hints at a potential **ExpressionEngine CMS** setup:

- ExpressionEngine database config would live at `system/expressionengine/config/database.php`
- ExpressionEngine app config would live at `system/expressionengine/config/config.php`
- Image uploads would go under `images/` subdirectories

Until actual code is added, no specific language, framework, or toolchain is enforced.

## Development Workflow

### Branching

- Development happens on feature branches off `main`
- Branch naming convention (for Claude): `claude/<task-slug>`
- All changes should be committed and pushed before opening a PR

### CI/CD

- GitHub Actions is configured in `.github/workflows/blank.yml`
- Currently a template only — triggers on push/PR to `main` and manual dispatch
- Runs on `ubuntu-latest`
- **Action required**: Replace placeholder `echo` steps with real build, test, and deploy commands as the project matures

### Committing

- Write clear, descriptive commit messages
- Use the imperative mood: "Add feature" not "Added feature"
- Keep commits focused and atomic

## Sensitive Files — Never Commit

The following are explicitly excluded from version control and must **never** be committed:

| Path | Reason |
|------|--------|
| `system/expressionengine/config/database.php` | Database credentials |
| `system/expressionengine/config/config.php` | Application secrets |
| `images/avatars/`, `images/captchas/`, etc. | User-uploaded media |
| `*/expressionengine/cache/*` | Generated cache files |
| `.DS_Store` | macOS metadata |

## Conventions for AI Assistants

- **No application code exists yet** — avoid generating opinionated scaffolding unless explicitly asked.
- When adding code, establish and document the chosen language/framework in this file.
- Update this CLAUDE.md whenever significant architectural decisions are made (tech stack, directory layout, testing approach, environment variables).
- Follow the existing `.gitignore` patterns; extend them as needed when new file types are introduced.
- Keep changes minimal and focused — do not refactor or add features beyond what is requested.
- When implementing ExpressionEngine or any CMS integration, never hardcode credentials; use environment variables or gitignored config files.

## License

Apache 2.0 — see `LICENSE` for full terms.
