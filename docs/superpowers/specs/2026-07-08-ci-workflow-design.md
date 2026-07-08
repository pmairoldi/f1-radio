# Continuous Integration Workflow Design

## Goal

Add a GitHub Actions workflow that validates every pull request and every push to `main`.
The workflow must run the project's Svelte and TypeScript checks, linting, complete test suite,
and production build in the requested order.

## Workflow

Create `.github/workflows/ci.yml` with one job on `ubuntu-latest`. Trigger it for all pull request
activity and pushes to `main`. Grant only read access to repository contents.

The job uses the same supported toolchain as the project and i18n workflow:

1. Check out the repository with `actions/checkout@v7`.
2. Install pnpm with `pnpm/action-setup@v6`, using the version from `package.json`.
3. Install Node.js 24 with `actions/setup-node@v6` and enable pnpm dependency caching.
4. Install dependencies with `pnpm install --frozen-lockfile`.
5. Install Chromium and its system dependencies with
   `pnpm exec playwright install --with-deps chromium`.
6. Run `pnpm check`.
7. Run `pnpm lint`.
8. Run `pnpm test`.
9. Run `pnpm build`.

GitHub Actions stops the job at the first failing step, making the failed validation category clear
in the workflow UI. No artifacts, deployment, matrix testing, or workflow-specific package scripts
are needed.

## Testing

Validate the workflow syntax locally with `actionlint`. Run `pnpm check` and `pnpm lint` to verify
the repository remains valid after adding the YAML file. The full test and build commands are the
workflow's runtime behavior and do not require application code changes.
