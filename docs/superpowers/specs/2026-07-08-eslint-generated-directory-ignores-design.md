# ESLint Generated Directory Ignores Design

## Goal

Prevent ESLint from scanning generated files under `.vercel/` and `src/lib/paraglide/`.
Both directories are already gitignored and are not maintained as source code.

## Configuration

Extend the existing global `ignores` array in `eslint.config.js` with `.vercel/` and
`src/lib/paraglide/`. Keeping all global directory ignores in the existing flat-config object
preserves the current configuration structure and applies the policy to every ESLint invocation.

Do not change the `lint` package script, Prettier configuration, generated output, or application
source files.

## Verification

Run `pnpm lint` and require exit status 0. Confirm the output contains no diagnostics from either
ignored directory. Review the diff to ensure only the ESLint configuration changes during
implementation.
