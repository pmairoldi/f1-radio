<script lang="ts">
	import domtoimage from 'dom-to-image';

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
			const scale = isSafari ? 2 : 3; // Lower scale for Safari
			const { offsetWidth, offsetHeight } = output;

			// Temporarily hide complex elements for Safari during copy
			const waveElements = isSafari ? output.querySelectorAll('.safari-optimize') : [];
			if (isSafari) {
				waveElements.forEach(el => el.style.display = 'none');
			}

			// Safari-specific optimizations
			const options = {
				height: offsetHeight * scale,
				width: offsetWidth * scale,
				cacheBust: false,
				filter: (node: Element) => {
					// Skip animations and complex elements that slow down Safari
					if (node.classList && node.classList.contains('animate-spin')) {
						return false;
					}
					return true;
				},
				style: {
					transform: `scale(${scale})`,
					transformOrigin: 'top left',
					width: `${offsetWidth}px`,
					height: `${offsetHeight}px`
				}
			};

			// Add Safari-specific optimizations
			if (isSafari) {
				options.quality = 0.8;
				options.pixelRatio = 1; // Force pixel ratio to 1 for Safari
			}

			await navigator.clipboard.write([
				new ClipboardItem({
					'image/png': domtoimage.toBlob(output, options)
				})
			]);

			// Restore hidden elements
			if (isSafari) {
				waveElements.forEach(el => el.style.display = '');
			}

			running = false;
		} catch (error) {
			// Restore hidden elements on error
			if (isSafari) {
				const waveElements = output.querySelectorAll('.safari-optimize');
				waveElements.forEach(el => el.style.display = '');
			}
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
