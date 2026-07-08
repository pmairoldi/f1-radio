# Continuous Integration Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a GitHub Actions workflow that checks, lints, tests, and builds the app for pull
requests and pushes to `main`.

**Architecture:** A single `ubuntu-latest` job prepares the repository's Node 24 and pnpm 11
toolchain, installs Chromium for Playwright, and runs each validation command sequentially. The
workflow uses explicit steps so GitHub identifies which validation category failed.

**Tech Stack:** GitHub Actions, Node.js 24, pnpm 11, SvelteKit, Playwright, Vitest

## Global Constraints

- Trigger the workflow for all pull requests and pushes to `main`.
- Grant only read access to repository contents.
- Run `pnpm check`, `pnpm lint`, `pnpm test`, and `pnpm build` in that order.
- Use the action versions already established by `.github/workflows/i18n.yml`.
- Install dependencies from `pnpm-lock.yaml` without permitting lockfile changes.
- Install Chromium and its required system dependencies before running Playwright.
- Do not add artifacts, deployment, matrix testing, or workflow-specific package scripts.

---

### Task 1: Add the continuous integration workflow

**Files:**

- Create: `.github/workflows/ci.yml`
- Reference: `.github/workflows/i18n.yml`
- Reference: `package.json`
- Reference: `playwright.config.ts`

**Interfaces:**

- Consumes: The `packageManager` and `engines.node` values in `package.json`, the scripts in
  `package.json`, and Playwright's Chromium-based integration test configuration.
- Produces: A GitHub Actions workflow named `CI` with a job named `Validate`.

- [ ] **Step 1: Confirm the workflow does not already exist**

Run: `test ! -e .github/workflows/ci.yml`

Expected: Exit status 0. If the file exists, inspect it and reconcile this plan with its contents
before proceeding instead of overwriting it.

- [ ] **Step 2: Create the workflow**

Create `.github/workflows/ci.yml` with exactly:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read

jobs:
  validate:
    name: Validate
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v7

      - name: Install pnpm
        uses: pnpm/action-setup@v6

      - name: Install Node.js
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Install Chromium
        run: pnpm exec playwright install --with-deps chromium

      - name: Check
        run: pnpm check

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test

      - name: Build
        run: pnpm build
```

- [ ] **Step 3: Validate the workflow syntax**

Run: `actionlint .github/workflows/ci.yml`

Expected: Exit status 0 with no output.

- [ ] **Step 4: Run the static checks**

Run: `pnpm check && pnpm lint`

Expected: Exit status 0. Svelte reports no errors or warnings, and Prettier and ESLint report no
violations.

- [ ] **Step 5: Run the test suite before the production build**

Run: `pnpm test && pnpm build`

Expected: Exit status 0. All Playwright and Vitest tests pass, followed by a successful Vite
production build.

- [ ] **Step 6: Review the final change**

Run: `git diff --check && git diff -- .github/workflows/ci.yml`

Expected: Exit status 0, no whitespace errors, and a diff containing only the new CI workflow.

- [ ] **Step 7: Commit the workflow**

```bash
git add .github/workflows/ci.yml
git commit -m "add continuous integration workflow"
```

Expected: One commit containing `.github/workflows/ci.yml` and no unrelated files.
