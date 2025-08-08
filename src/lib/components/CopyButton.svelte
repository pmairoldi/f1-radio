<script lang="ts">
	import domtoimage from 'dom-to-image';

	interface Props {
		element?: HTMLElement | undefined;
	}

	let { element }: Props = $props();

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

		running = true;
		try {
			await navigator.clipboard.write([
				new ClipboardItem({
					'image/png': getImage(output)
				})
			]);

			running = false;
		} catch (error) {
			console.error('oops, something went wrong!', error);
			running = false;
		}
	}
</script>

<button
	type="button"
	class="flex items-center gap-1 rounded-xl bg-red-700 p-2 text-white disabled:opacity-70"
	onclick={execute}
	disabled={running}
>
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
		Copying
	{:else}
		Copy
	{/if}
</button>
