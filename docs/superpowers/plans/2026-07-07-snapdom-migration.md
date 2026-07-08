# snapdom Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `dom-to-image` with `@zumer/snapdom` for PNG export, gated by visual regression
tests that prove the exported image is unchanged.

**Architecture:** Both libraries rasterize via SVG `<foreignObject>`, so the browser engine renders
both — output parity is achievable. The migration is gated by Playwright visual regression tests:
Task 1 captures baseline PNGs from the _current_ dom-to-image implementation, Task 2 swaps the
library and must pass against those baselines, Task 3 re-baselines on snapdom output with a tight
tolerance to guard future changes.

**Tech Stack:** SvelteKit, Playwright (`@playwright/test` visual comparisons via
`toMatchSnapshot`), `@zumer/snapdom` 2.15.0, pnpm.

## Global Constraints

- Style: tabs, single quotes, no trailing commas, 100-character lines (project Prettier config)
- Package manager: pnpm (never npm/yarn for installs)
- `getImage(output: HTMLElement): Promise<Blob>` in `src/lib/element-to-image.ts` must keep its
  exact signature — `CopyButton.svelte` passes the promise straight into `ClipboardItem`
- Exported PNG must be 3× the element's CSS pixel size regardless of `devicePixelRatio`
  (current behavior: element is 320px wide → 960px-wide PNG)
- Never edit generated `src/lib/paraglide/*` files
- Playwright webServer runs `npm run build && npm run preview` on port 4173 — integration test
  runs include a production build (~1 min startup)
- Snapshot baselines are platform-suffixed (`-darwin`); the only CI workflow is i18n, so
  baselines are generated and consumed on macOS only

## Context for implementers

- `src/lib/element-to-image.ts` is the only file importing `dom-to-image`. Current
  implementation scales via a CSS `transform: scale(3)` override plus explicit width/height:

```ts
import domtoimage from 'dom-to-image';

export async function getImage(output: HTMLElement): Promise<Blob> {
	const scale = 3;
	const width = output.offsetWidth;
	const height = output.offsetHeight;

	return domtoimage.toBlob(output, {
		width: width * scale,
		height: height * scale,
		style: {
			transform: `scale(${scale})`,
			transformOrigin: 'top left',
			width: `${width}px`,
			height: `${height}px`
		}
	});
}
```

- The RadioBox (`src/lib/renderers/2025-current/RadioBox.svelte`) renders an audio wave whose
  bar heights use `Math.random()` — visual tests MUST stub `Math.random` before page scripts run
  or every export differs.
- Generator state comes from URL params: `d` = driver key (e.g. `lando_norris`,
  `charles_leclerc`), repeated `m` = `type:text` where type is `driver` or `team`.
- The export must reproduce: two custom woff2 fonts (`Formula1` weights 400/700/900,
  `KH Interference F1` weights 400/700, loaded from `static/fonts.css`), gradient text via
  `background-clip: text` (driver number), `color-mix(in oklab, …)` team colors,
  `filter: drop-shadow` on the wave, and same-origin bundled team-logo PNGs.
- `tests/copy-button.test.ts` already establishes the download-capture pattern: stub
  `navigator.clipboard` + `ClipboardItem` to `undefined` via `addInitScript` so `CopyButton`
  falls through to the anchor-download path, stub the PostHog relay route
  (`**/relay-ujOT/**`), then `page.waitForEvent('download')`.
- snapdom 2.15.0 API (verified from `types/snapdom.d.ts`):
  `snapdom.toBlob(el, options?: SnapdomOptions & BlobOptions): Promise<Blob>` with
  `type?: 'svg' | 'png' | 'jpg' | 'jpeg' | 'webp'` (default png), `scale?: number` (output
  multiplier, takes precedence over width/height), `dpr?: number` (defaults to
  `devicePixelRatio` and multiplies with scale — must be pinned to 1), `embedFonts?: boolean`
  (default false — must be true, non-icon fonts are only embedded when enabled).
- `.gitignore` ignores `/test-results` but not `*-snapshots` directories — baselines commit
  normally.

---

### Task 1: Visual regression tests + baselines from the current dom-to-image implementation

**Files:**

- Create: `tests/visual-regression.test.ts`
- Create (generated): `tests/visual-regression.test.ts-snapshots/*.png`

**Interfaces:**

- Consumes: the running app at `/?d=…&m=…` (Playwright webServer), `CopyButton` download
  fallback path
- Produces: baseline PNGs that Task 2 uses as its parity gate; test names
  `mclaren-driver-team.png` and `ferrari-driver.png`

- [ ] **Step 1: Write the visual regression test**

Create `tests/visual-regression.test.ts`:

```ts
import { readFile } from 'node:fs/promises';
import { expect, test, type Page } from '@playwright/test';

async function exportImage(page: Page, url: string): Promise<Buffer> {
	await page.addInitScript(() => {
		Math.random = () => 0.5;
		Object.defineProperty(navigator, 'clipboard', {
			value: undefined
		});
		Object.defineProperty(window, 'ClipboardItem', {
			value: undefined
		});
	});

	await page.route('**/relay-ujOT/**', (route) => route.fulfill({ status: 204, body: '' }));
	await page.goto(url);

	await page.waitForFunction(
		() =>
			document.fonts.status === 'loaded' &&
			document.fonts.check('700 16px "Formula1"') &&
			document.fonts.check('900 16px "KH Interference F1"') &&
			Array.from(document.images).every((img) => img.complete && img.naturalWidth > 0)
	);

	const download = page.waitForEvent('download');
	await page.getByRole('button', { name: 'Copy' }).click();
	const path = await (await download).path();
	return readFile(path);
}

test('exported image is stable for a driver and team conversation', async ({ page }) => {
	const image = await exportImage(
		page,
		'/?d=lando_norris&m=driver%3ABox%20box%20box&m=team%3ACopy%20that'
	);
	expect(image).toMatchSnapshot('mclaren-driver-team.png', { maxDiffPixelRatio: 0.01 });
});

test('exported image is stable for a driver message', async ({ page }) => {
	const image = await exportImage(page, '/?d=charles_leclerc&m=driver%3AWe%20are%20checking');
	expect(image).toMatchSnapshot('ferrari-driver.png', { maxDiffPixelRatio: 0.01 });
});
```

Why these two scenarios: McLaren (light team color, two message types, last-name display) and
Ferrari (dark red, single message) exercise both fonts, the gradient number, `color-mix`
derived colors, two different logos, and both message renderers. `Math.random = () => 0.5`
makes the wave noise term `(0.5 - 0.5) * 40 = 0`, so bar heights are deterministic.

- [ ] **Step 2: Generate baselines from the current dom-to-image implementation**

Run: `pnpm exec playwright test tests/visual-regression.test.ts --update-snapshots`
Expected: `2 passed`, with output noting snapshots written to
`tests/visual-regression.test.ts-snapshots/mclaren-driver-team-darwin.png` and
`ferrari-driver-darwin.png`. (First run includes the production build — allow ~2 min.)

- [ ] **Step 3: Prove the tests are deterministic**

Run: `pnpm exec playwright test tests/visual-regression.test.ts --repeat-each=3`
Expected: `6 passed`. If any repeat fails, the capture is nondeterministic — STOP and fix
determinism (check fonts race, wave randomness, image loading) before any migration work.
A flaky parity gate is worthless.

- [ ] **Step 4: Verify baseline dimensions**

Open both PNGs (`open tests/visual-regression.test.ts-snapshots/*.png`) and confirm:
960px wide (320 × 3), fonts rendered (not fallback sans-serif), gradient number visible,
team logo present, wave visible at the top. This is the reference for what "identical" means.

- [ ] **Step 5: Lint and commit**

Run: `pnpm lint` (run `pnpm format` first if Prettier complains)
Expected: no errors.

```bash
git add tests/visual-regression.test.ts tests/visual-regression.test.ts-snapshots
git commit -m "test: add visual regression tests for PNG export"
```

---

### Task 2: Swap dom-to-image for @zumer/snapdom

**Files:**

- Modify: `src/lib/element-to-image.ts` (entire file, 18 lines)
- Modify: `package.json`, `pnpm-lock.yaml` (via pnpm commands only)

**Interfaces:**

- Consumes: baselines from Task 1; snapdom API
  `snapdom.toBlob(el, options): Promise<Blob>`
- Produces: `getImage(output: HTMLElement): Promise<Blob>` — unchanged signature, now
  snapdom-backed. `CopyButton.svelte` requires no changes.

- [ ] **Step 1: Swap the dependencies**

```bash
pnpm remove dom-to-image @types/dom-to-image
pnpm add @zumer/snapdom
```

Expected: `package.json` gains `"@zumer/snapdom": "^2.15.0"` (or newer 2.x) under
`dependencies`; both dom-to-image entries gone.

- [ ] **Step 2: Rewrite element-to-image.ts**

Replace the entire contents of `src/lib/element-to-image.ts` with:

```ts
import { snapdom } from '@zumer/snapdom';

export async function getImage(output: HTMLElement): Promise<Blob> {
	return snapdom.toBlob(output, {
		type: 'png',
		scale: 3,
		dpr: 1,
		embedFonts: true
	});
}
```

Notes: `scale: 3` replaces the manual transform/width/height override. `dpr: 1` is required —
snapdom's output size is element size × scale × dpr and dpr defaults to `devicePixelRatio`, so
omitting it doubles the output on retina displays. `embedFonts: true` is required — snapdom
only embeds non-icon fonts when enabled, and the RadioBox depends on two custom woff2 families.

- [ ] **Step 3: Type-check**

Run: `pnpm check`
Expected: 0 errors, 0 warnings. If TS rejects an option name, inspect
`node_modules/@zumer/snapdom/types/snapdom.d.ts` and correct the option to match the installed
version — do not cast to `any`.

- [ ] **Step 4: Run the parity gate**

Run: `pnpm exec playwright test tests/visual-regression.test.ts`
Expected: `2 passed` against the dom-to-image baselines from Task 1.

If a test fails: Playwright writes `*-actual.png`, `*-expected.png`, and `*-diff.png` under
`test-results/` — open all three. Then:

- Wrong dimensions → `dpr`/`scale` misconfiguration; fix the options, don't touch the test.
- Missing/fallback fonts → `embedFonts` not working; try `fast: false` in the options, and if
  that fails add `preCache` (from `@zumer/snapdom/preCache`) warm-up before capture.
- Diff only along glyph/curve edges and `maxDiffPixelRatio` barely exceeded (< ~0.03) →
  antialiasing variance between the two serializers; acceptable, raise the test's
  `maxDiffPixelRatio` to `0.03` with a code comment, note it in the commit message.
- Structural differences (missing gradient, wave, logo, wrong colors) → fidelity regression;
  STOP and report with the diff images. Do not re-baseline to force a pass.

- [ ] **Step 5: Run the remaining test suites**

Run: `pnpm test:integration` then `pnpm test:unit --run`
Expected: all pass (copy-button download tests exercise the new code end-to-end).

- [ ] **Step 6: Lint**

Run: `pnpm lint`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml src/lib/element-to-image.ts
git commit -m "feat: replace dom-to-image with @zumer/snapdom"
```

---

### Task 3: Re-baseline on snapdom output and tighten the tolerance

The 1% tolerance existed to absorb cross-library antialiasing variance during the swap. Going
forward the baselines should be exact snapdom output with a near-zero tolerance so future
changes (season data, renderer tweaks, snapdom upgrades) are caught precisely.

**Files:**

- Modify: `tests/visual-regression.test.ts` (tolerance option, 2 lines)
- Modify (regenerated): `tests/visual-regression.test.ts-snapshots/*.png`

**Interfaces:**

- Consumes: passing snapdom implementation from Task 2
- Produces: strict ongoing visual regression guard

- [ ] **Step 1: Tighten the comparison tolerance**

In `tests/visual-regression.test.ts`, change both assertions from
`{ maxDiffPixelRatio: 0.01 }` (or `0.03` if raised in Task 2) to `{ maxDiffPixels: 25 }`:

```ts
expect(image).toMatchSnapshot('mclaren-driver-team.png', { maxDiffPixels: 25 });
```

```ts
expect(image).toMatchSnapshot('ferrari-driver.png', { maxDiffPixels: 25 });
```

- [ ] **Step 2: Regenerate baselines from snapdom output**

Run: `pnpm exec playwright test tests/visual-regression.test.ts --update-snapshots`
Expected: `2 passed`, both snapshot files rewritten.

- [ ] **Step 3: Verify stability at the tight tolerance**

Run: `pnpm exec playwright test tests/visual-regression.test.ts --repeat-each=3`
Expected: `6 passed`. If flaky at `maxDiffPixels: 25`, snapdom output varies between runs —
find the varying region in the diff images before loosening anything.

- [ ] **Step 4: Visually confirm the new baselines**

Open both regenerated PNGs and compare against the Task 1 versions
(`git show HEAD~1:tests/visual-regression.test.ts-snapshots/<name>` to extract the old ones if
needed). They must be indistinguishable by eye.

- [ ] **Step 5: Commit**

```bash
git add tests/visual-regression.test.ts tests/visual-regression.test.ts-snapshots
git commit -m "test: re-baseline visual regression on snapdom output"
```

---

## Verification checklist (post-plan)

- `pnpm check`, `pnpm lint`, `pnpm test:unit --run`, `pnpm test:integration` all pass
- `grep -r "dom-to-image" src package.json` returns nothing
- Manual smoke test in `pnpm dev`: click Copy, paste into an image editor — fonts, gradient
  number, wave, and logo all correct at 960px width
- Review final diff for generated or unrelated changes (per CLAUDE.md)
