<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import domtoimage from 'dom-to-image';
	import Button from './Button.svelte';

	interface Props {
		element: HTMLElement | undefined;
		onCopy: (duration: number) => void;
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

	async function execute(): Promise<void> {
		const output = element;
		if (output == null) {
			return;
		}

		const start = performance.now();
		running = true;
		try {
			await navigator.clipboard.write([
				new ClipboardItem({
					'image/png': getImage(output)
				})
			]);

			onCopy(performance.now() - start);
			running = false;
		} catch (error) {
			onError(error, performance.now() - start);
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
