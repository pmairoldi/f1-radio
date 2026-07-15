# Clipboard Rejected Event Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development
> (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Capture a PostHog custom event with error details when an attempted clipboard image write
rejects, while preserving the PNG download fallback.

**Architecture:** `CopyButton` reports the rejected value through a new callback and remains unaware
of PostHog. The generator route normalizes the error details and captures the event alongside the
existing URL-state context. Playwright spies on the initialized browser PostHog instance to verify
the event contract without sending analytics traffic.

**Tech Stack:** Svelte 5, strict TypeScript, PostHog JS, Playwright

## Execution Adjustment

The npm PostHog instance is not exposed on `window`, so the planned Playwright capture spy cannot
observe it. Keep the production callback architecture, isolate event normalization and capture in
`src/lib/posthog/events.ts`, verify that contract with a Vitest PostHog mock, and retain the existing
Playwright coverage for both download fallback paths.

## Global Constraints

- Fire `copy_button.clipboard_rejected` only when `navigator.clipboard.write()` rejects.
- Do not fire it when the Clipboard API or `ClipboardItem` is unavailable.
- Attach `error_name`, `error_message`, and `error_stack` when available.
- Attach the current `driver` and `messages` URL-state context.
- Do not call `posthog.captureException` for this handled rejection.
- Preserve the successful PNG download fallback and `copy_button.success` event.
- Use tabs, single quotes, no trailing commas, and 100-character lines.

---

### Task 1: Capture clipboard write rejections

**Files:**

- Modify: `tests/copy-button.test.ts`
- Modify: `src/lib/components/CopyButton.svelte`
- Modify: `src/routes/+page.svelte`

**Interfaces:**

- Consumes: the existing `CopyButton` props `element`, `onCopy`, and `onError`
- Produces: required prop `onClipboardRejected: (error: unknown) => void`
- Produces: PostHog event `copy_button.clipboard_rejected` with generator context and normalized
  error properties

- [ ] **Step 1: Add a PostHog capture spy and failing rejection assertions**

Update the Playwright import and add helpers at the top of `tests/copy-button.test.ts`:

```typescript
import { expect, test, type Page } from '@playwright/test';

interface CapturedEvent {
	event: string;
	properties?: Record<string, unknown>;
}

async function spyOnPosthog(page: Page) {
	await page.evaluate(() => {
		const target = window as typeof window & {
			__posthogCaptures: CapturedEvent[];
			posthog: {
				capture: (event: string, properties?: Record<string, unknown>) => void;
			};
		};
		target.__posthogCaptures = [];
		target.posthog.capture = (event, properties) => {
			target.__posthogCaptures.push({ event, properties });
		};
	});
}

async function getCapturedEvent(page: Page, event: string): Promise<CapturedEvent | undefined> {
	return page.evaluate((eventName) => {
		const target = window as typeof window & {
			__posthogCaptures: CapturedEvent[];
		};
		return target.__posthogCaptures.find((capture) => capture.event === eventName);
	}, event);
}
```

After each existing `page.goto(...)`, call:

```typescript
await spyOnPosthog(page);
```

At the end of the unavailable-API test, assert that the event was not emitted:

```typescript
expect(await getCapturedEvent(page, 'copy_button.clipboard_rejected')).toBeUndefined();
```

At the end of the rejected-write test, assert the event and its properties:

```typescript
await expect
	.poll(() => getCapturedEvent(page, 'copy_button.clipboard_rejected'))
	.toEqual({
		event: 'copy_button.clipboard_rejected',
		properties: expect.objectContaining({
			driver: 'lando_norris',
			messages: ['driver:Test'],
			error_name: 'NotAllowedError',
			error_message: 'Write permission denied.',
			error_stack: expect.any(String)
		})
	});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
pnpm exec playwright test tests/copy-button.test.ts
```

Expected: the rejected-write test fails because no `copy_button.clipboard_rejected` event is
captured. The unavailable-API assertion passes.

- [ ] **Step 3: Report the rejected value from `CopyButton`**

Add the callback to `Props` in `src/lib/components/CopyButton.svelte`:

```typescript
onClipboardRejected: (error: unknown) => void;
```

Destructure it with the existing props:

```typescript
let { element, onCopy, onError, onClipboardRejected }: Props = $props();
```

Replace the empty catch binding with a rejection callback while retaining the fallback:

```typescript
} catch (error) {
	onClipboardRejected(error);
	// clipboard denied or unsupported for images; fall through to download
}
```

- [ ] **Step 4: Capture the normalized custom event in the route**

Add this handler next to `onCopy` and `onError` in `src/routes/+page.svelte`:

```typescript
function onClipboardRejected(error: unknown) {
	const { searchParams } = new URL(page.url);
	const errorDetails =
		error instanceof Error
			? {
					error_name: error.name,
					error_message: error.message,
					...(error.stack == null ? {} : { error_stack: error.stack })
				}
			: { error_message: String(error) };

	posthog.capture('copy_button.clipboard_rejected', {
		driver: searchParams.get('d'),
		messages: searchParams.getAll('m'),
		...errorDetails
	});
}
```

Pass the handler into `CopyButton`:

```svelte
<CopyButton element={output} {onCopy} {onError} {onClipboardRejected} />
```

- [ ] **Step 5: Run the focused test and verify GREEN**

Run:

```bash
pnpm exec playwright test tests/copy-button.test.ts
```

Expected: both clipboard integration tests pass; the rejection test also observes the successful
download.

- [ ] **Step 6: Run required and proportional verification**

Run:

```bash
pnpm check
pnpm lint
pnpm test:integration
```

Expected: all commands exit with status 0 and report no type, Svelte, formatting, lint, or
Playwright failures.

- [ ] **Step 7: Review and commit the implementation**

Run:

```bash
git diff --check
git status --short
git diff -- src/lib/components/CopyButton.svelte src/routes/+page.svelte tests/copy-button.test.ts
git add src/lib/components/CopyButton.svelte src/routes/+page.svelte tests/copy-button.test.ts
git commit -m "feat: track rejected clipboard writes"
```

Expected: only the three intended implementation files are staged, and the commit succeeds.
