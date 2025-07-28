<script lang="ts">
	import html2canvas from 'html2canvas';

	interface Props {
		element?: HTMLElement | undefined;
	}

	let { element }: Props = $props();

	let running = $state<boolean>(false);

	async function execute() {
		const output = element;
		if (output == null) {
			return;
		}

		running = true;
		try {
			// Detect Safari for optimizations
			const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
			const scale = isSafari ? 2 : 3;

			// html2canvas options optimized for Safari
			const options = {
				scale: scale,
				useCORS: true,
				allowTaint: false,
				backgroundColor: '#1f2937',
				removeContainer: true,
				ignoreElements: (element: Element) => {
					// Skip spinning animations
					if (element.classList && element.classList.contains('animate-spin')) {
						return true;
					}
					return false;
				}
			};

			// Safari-specific optimizations
			if (isSafari) {
				options.width = output.offsetWidth;
				options.height = output.offsetHeight;
				options.foreignObjectRendering = false; // Disable for better Safari compatibility
				options.imageTimeout = 5000; // Reduce timeout for faster processing
			}

			// Generate canvas using html2canvas
			const canvas = await html2canvas(output, options);
			
			// Convert canvas to blob
			const blob = await new Promise<Blob>((resolve) => {
				canvas.toBlob((blob) => {
					resolve(blob!);
				}, 'image/png', isSafari ? 0.8 : 0.95);
			});

			// Copy to clipboard
			await navigator.clipboard.write([
				new ClipboardItem({
					'image/png': blob
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
	onclick={() => execute()}
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
