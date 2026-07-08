# CopyButton Clipboard Fallback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** When the clipboard image write fails or is unsupported, CopyButton silently downloads the PNG as `f1-radio-meme.png` instead of failing invisibly.

**Architecture:** All export logic stays in `src/lib/components/CopyButton.svelte` (the project centralizes PNG export there). One attempt path: clipboard write with a Promise-valued `ClipboardItem` (Safari-safe); any failure or missing API falls through to an object-URL download. Real render failures (dom-to-image rejects) still reach `onError` → PostHog. The `onCopy` callback gains a `method` argument so `+page.svelte` can report how the copy happened.

**Tech Stack:** SvelteKit 2 + Svelte 5 runes, TypeScript strict, dom-to-image, Playwright integration tests.

**Spec:** `docs/superpowers/specs/2026-07-05-copybutton-clipboard-fallback-design.md`

## Global Constraints

- Code style: tabs, single quotes, no trailing commas, 100 char width (Prettier/ESLint enforced).
- Svelte 5 runes syntax (`$props()`, `$state()`); no Svelte 4 patterns.
- Download filename is exactly `f1-radio-meme.png`.
- No UA sniffing, no new i18n strings, no new components.
- Playwright starts its own server (`playwright.config.ts` webServer runs build + preview on port 4173); never start a dev server manually for tests.
- Commit messages: short, lowercase, imperative (matches repo history, e.g. "add custom events").

---

### Task 1: Download fallback in CopyButton (test-first)

**Files:**

- Modify: `src/lib/components/CopyButton.svelte`
- Test: `tests/copy-button.test.ts` (one test already exists and currently fails; add a second)

**Interfaces:**

- Consumes: `domtoimage.toBlob(node, options): Promise<Blob>` (existing `getImage` helper, unchanged).
- Produces: `CopyButton` prop signature `onCopy: (duration: number, method: 'clipboard' | 'download') => void`. Task 2 relies on this exact signature. `onError: (error: unknown, duration: number) => void` is unchanged.

- [ ] **Step 1: Add the denied-write test**

`tests/copy-button.test.ts` already contains the missing-API test. Append this second test to the same file (covers the dominant Chrome/Android case where the API exists but the write is denied):

```typescript
test('downloads the image when the clipboard write is denied', async ({ page }) => {
	await page.addInitScript(() => {
		Object.defineProperty(navigator, 'clipboard', {
			value: {
				write: () => Promise.reject(new DOMException('Write permission denied.', 'NotAllowedError'))
			}
		});
	});

	await page.route('**/relay-ujOT/**', (route) => route.fulfill({ status: 204, body: '' }));
	await page.goto('/?d=lando_norris&m=driver%3ATest');

	const download = page.waitForEvent('download');
	await page.getByRole('button', { name: 'Copy' }).click();

	expect((await download).suggestedFilename()).toBe('f1-radio-meme.png');
});
```

- [ ] **Step 2: Run the tests to verify both fail**

Run: `pnpm test:integration tests/copy-button.test.ts`

Expected: 2 failed. Both time out on `page.waitForEvent('download')` (~30s each) because the current component reports the error via `onError` and never downloads. The webServer build takes a minute on first run — this is normal.

- [ ] **Step 3: Implement the fallback in CopyButton.svelte**

Replace the `Props` interface and the `execute` function in `src/lib/components/CopyButton.svelte`, and add the `copy` and `download` helpers. The `getImage` function and the markup below the script block are unchanged. The full script block after the change:

```svelte
<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import domtoimage from 'dom-to-image';
	import Button from './Button.svelte';

	interface Props {
		element: HTMLElement | undefined;
		onCopy: (duration: number, method: 'clipboard' | 'download') => void;
		onError: (error: unknown, duration: number) => void;
	}

	let { element, onCopy, onError }: Props = $props();

	let running = $state<boolean>(false);

	async function getImage(output: HTMLElement): Promise<Blob> {
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

	function download(blob: Blob) {
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement('a');
		anchor.href = url;
		anchor.download = 'f1-radio-meme.png';
		anchor.click();
		setTimeout(() => URL.revokeObjectURL(url), 1000);
	}

	async function copy(image: Promise<Blob>): Promise<'clipboard' | 'download'> {
		if (navigator.clipboard?.write != null && typeof ClipboardItem !== 'undefined') {
			try {
				await navigator.clipboard.write([
					new ClipboardItem({
						'image/png': image
					})
				]);
				return 'clipboard';
			} catch {
				// clipboard denied or unsupported for images; fall through to download
			}
		}

		download(await image);
		return 'download';
	}

	async function execute(): Promise<void> {
		const output = element;
		if (output == null) {
			return;
		}

		const start = performance.now();
		running = true;
		try {
			const method = await copy(getImage(output));
			onCopy(performance.now() - start, method);
		} catch (error) {
			onError(error, performance.now() - start);
		} finally {
			running = false;
		}
	}
</script>
```

Why this shape:

- `getImage(output)` is called synchronously inside the click handler and its Promise goes straight into `ClipboardItem` — Safari revokes clipboard access if the item is constructed after an `await`.
- If the render itself fails, `await image` inside `copy` rethrows that rejection, `execute`'s catch fires `onError`, and PostHog still sees genuine dom-to-image bugs. Expected clipboard denials never reach `onError` anymore.
- The URL revoke is deferred because some browsers cancel a download whose blob URL is revoked in the same tick as the click.

- [ ] **Step 4: Run the tests to verify both pass**

Run: `pnpm test:integration tests/copy-button.test.ts`

Expected: 2 passed.

- [ ] **Step 5: Type check and lint**

Run: `pnpm check && pnpm lint`

Expected: both succeed. Note: `+page.svelte` still passes an `onCopy` that takes only `duration` — TypeScript allows callbacks with fewer parameters, so `check` stays green; Task 2 updates it.

- [ ] **Step 6: Commit**

```bash
git add src/lib/components/CopyButton.svelte tests/copy-button.test.ts
git commit -m "add download fallback to copy button"
```

---

### Task 2: Report copy method in analytics

**Files:**

- Modify: `src/routes/+page.svelte:114-123` (the `onCopy` function)
- Modify: `src/lib/components/AGENTS.md` (CopyButton row in the components table)

**Interfaces:**

- Consumes: `onCopy(duration: number, method: 'clipboard' | 'download')` — the prop signature produced by Task 1.
- Produces: `copy_button.success` PostHog event gains a `method` property (`'clipboard'` or `'download'`), used later to monitor fallback frequency.

- [ ] **Step 1: Add the method parameter to onCopy in +page.svelte**

Replace the existing `onCopy` function (currently lines 114-123):

```typescript
function onCopy(duration: number, method: 'clipboard' | 'download') {
	const url = new URL(page.url);
	const { searchParams } = url;

	posthog.capture('copy_button.success', {
		driver: searchParams.get('d'),
		messages: searchParams.getAll('m'),
		duration: duration,
		method: method
	});
}
```

No other change in this file — `<CopyButton element={output} {onCopy} {onError} />` already passes the function by reference.

- [ ] **Step 2: Update the components doc**

In `src/lib/components/AGENTS.md`, update the CopyButton row in the components table. Change the Key Props cell from:

`` `element: HTMLElement \| undefined`; `onCopy(duration)`; `onError(error, duration)` ``

to:

`` `element: HTMLElement \| undefined`; `onCopy(duration, method)`; `onError(error, duration)` ``

and the Purpose cell from:

`Exports a DOM element as PNG via dom-to-image at 3x scale; shows spinner during export`

to:

`Exports a DOM element as PNG via dom-to-image at 3x scale; copies to clipboard with download fallback; shows spinner during export`

- [ ] **Step 3: Type check, lint, and run the full test suite**

Run: `pnpm check && pnpm lint && pnpm test:integration`

Expected: check and lint succeed; 3 tests pass (2 copy-button + 1 index).

- [ ] **Step 4: Commit**

```bash
git add src/routes/+page.svelte src/lib/components/AGENTS.md
git commit -m "report copy method in copy_button.success event"
```
