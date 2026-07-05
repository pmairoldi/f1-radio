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

<Button type="button" onclick={execute} disabled={running}>
	{#if running}
		<svg
			class="h-4 w-4 animate-spin text-white"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	{/if}
	{#if running}
		{m['copy_button.copying']()}
	{:else}
		{m['copy_button.copy']()}
	{/if}
</Button>
