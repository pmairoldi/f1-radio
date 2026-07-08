# ESLint Generated Directory Ignores Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Exclude Vercel and Paraglide generated output from every ESLint invocation.

**Architecture:** Extend the existing global ignore object in the ESLint flat configuration. Use
the existing lint script for red/green verification so the test exercises the same command as CI.

**Tech Stack:** ESLint flat config, TypeScript ESLint, eslint-plugin-svelte, pnpm

## Global Constraints

- Ignore the complete `.vercel/` directory.
- Ignore the complete `src/lib/paraglide/` directory.
- Keep the ignore policy in the existing global `ignores` array in `eslint.config.js`.
- Do not change the lint package script, Prettier configuration, generated output, or application
  source files.
- Preserve all existing ESLint ignores and rules.

---

### Task 1: Ignore generated output in ESLint

**Files:**

- Modify: `eslint.config.js`
- Reference: `.gitignore`
- Reference: `src/lib/paraglide/.gitignore`

**Interfaces:**

- Consumes: ESLint's flat-config `ignores` glob array.
- Produces: Global exclusions for `.vercel/` and `src/lib/paraglide/`.

- [ ] **Step 1: Run the lint command to verify the current failure**

Run: `pnpm lint`

Expected: FAIL because ESLint scans generated JavaScript under `.vercel/`. Diagnostics identify
paths beginning with `.vercel/output/`; generated Paraglide files may also report warnings.

- [ ] **Step 2: Add both global ignores**

Replace the final ignore object in `eslint.config.js` with:

```js
{
	ignores: ['build/', '.svelte-kit/', 'dist/', 'package/', '.vercel/', 'src/lib/paraglide/'];
}
```

- [ ] **Step 3: Run lint to verify the configuration**

Run: `pnpm lint`

Expected: PASS. Output contains no paths under `.vercel/` or `src/lib/paraglide/`. Existing Svelte
warnings may remain because ESLint is not configured to fail on warnings.

- [ ] **Step 4: Run the Svelte and TypeScript checks**

Run: `pnpm check`

Expected: PASS with 0 errors and 0 warnings.

- [ ] **Step 5: Validate the CI workflow remains valid**

Run: `actionlint .github/workflows/ci.yml`

Expected: Exit status 0 with no output.

- [ ] **Step 6: Review the scoped diff**

Run: `git diff --check -- eslint.config.js && git diff -- eslint.config.js`

Expected: Exit status 0 and a diff that adds only `.vercel/` and `src/lib/paraglide/` to the global
ignore array.

- [ ] **Step 7: Commit only the ESLint configuration**

```bash
git add eslint.config.js
git commit -m "ignore generated output in eslint" -- eslint.config.js
```

Expected: One commit containing only `eslint.config.js`; existing staged formatting changes remain
outside the commit.
