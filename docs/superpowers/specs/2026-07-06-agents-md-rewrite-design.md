# AGENTS.md Rewrite Design

## Goal

Replace the generated root `AGENTS.md` with a concise, durable guide that gives coding agents
the project-specific context they cannot reliably infer from source alone.

## Structure

Keep one root instruction file. Retain only:

- A one-paragraph project and stack summary
- A compact map of important source locations
- Cross-cutting invariants for URL state, season and renderer versioning, and i18n
- Established code style
- Canonical development and verification commands

Nested instruction files remain deleted. Add one later only when a subtree develops commands or
constraints that materially differ from the repository defaults.

## Content Rules

- Remove generated dates, commit hashes, and branch names.
- Avoid exhaustive directory trees, component inventories, and source examples.
- Do not document implementation details that are easy to discover or likely to drift.
- State prohibitions only where violating them would cause regressions or edit generated files.
- Keep commands aligned with `package.json` and behavior aligned with current source.

## Verification

- Compare every path and command with the working tree and `package.json`.
- Confirm the guidance reflects debounced URL synchronization and active 2026 season data.
- Run Prettier against `AGENTS.md` and inspect the final diff for unrelated changes.
