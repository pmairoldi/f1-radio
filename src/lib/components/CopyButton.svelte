<script lang="ts">
	import domtoimage from 'dom-to-image-more';

	interface Props {
		element?: HTMLElement | undefined;
	}

	let { element }: Props = $props();

	let running = $state<boolean>(false);

	// Detect Safari for specific optimizations
	const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

	// Optimized function to simplify DOM for better performance, especially on Safari
	function optimizeElementForCapture(element: HTMLElement): HTMLElement {
		const clone = element.cloneNode(true) as HTMLElement;
		
		// Safari-specific optimizations for complex wave structures
		if (isSafari) {
			// Replace complex wave structure with simplified version for Safari
			const waveContainer = clone.querySelector('.grid.grid-cols-9');
			if (waveContainer) {
				// Create a simplified wave pattern for Safari to reduce render complexity
				const simplifiedWave = document.createElement('div');
				simplifiedWave.className = 'simplified-wave-pattern';
				simplifiedWave.style.cssText = `
					position: absolute;
					left: 0;
					right: 0;
					bottom: -24px;
					height: 72px;
					background: linear-gradient(90deg, 
						transparent 0%, 
						var(--team-color, #ff6b35) 25%, 
						var(--team-color, #ff6b35) 75%, 
						transparent 100%);
					opacity: 0.4;
					border-radius: 0 0 8px 8px;
				`;
				
				// Replace complex wave with simplified version
				waveContainer.parentNode?.replaceChild(simplifiedWave, waveContainer);
			}
		} else {
			// For non-Safari browsers, do lighter optimizations
			const waveElements = clone.querySelectorAll('.size-1');
			waveElements.forEach((el) => {
				const htmlEl = el as HTMLElement;
				// Pre-compute the scale and apply it directly to avoid CSS custom properties
				const intensity = htmlEl.style.getPropertyValue('--intensity');
				if (intensity) {
					const scale = parseFloat(intensity) / 100;
					htmlEl.style.transform = `scale(${scale})`;
					htmlEl.style.removeProperty('--intensity');
					htmlEl.classList.remove('scale-[var(--intensity)]');
				}
			});
		}

		// Remove any animations during capture to improve performance
		const animatedElements = clone.querySelectorAll('[class*="animate-"]');
		animatedElements.forEach((el) => {
			const htmlEl = el as HTMLElement;
			htmlEl.style.animation = 'none';
		});

		// Force GPU acceleration for better performance
		clone.style.willChange = 'transform';
		clone.style.transform = 'translateZ(0)';
		
		// Optimize font rendering
		clone.style.fontSmooth = 'always';
		clone.style.webkitFontSmoothing = 'antialiased';
		
		return clone;
	}

	async function getImage(output: HTMLElement): Promise<Blob> {
		const scale = 2;
		const width = output.offsetWidth;
		const height = output.offsetHeight;

		// Create optimized clone for capture
		const optimizedElement = optimizeElementForCapture(output);
		
		// Temporarily add to DOM for measurement (hidden)
		optimizedElement.style.position = 'absolute';
		optimizedElement.style.left = '-9999px';
		optimizedElement.style.top = '-9999px';
		optimizedElement.style.visibility = 'hidden';
		document.body.appendChild(optimizedElement);

		try {
			// Safari-optimized settings using dom-to-image-more
			const options = {
				width: width * scale,
				height: height * scale,
				quality: 0.95,
				bgcolor: '#16181c',
				scale: scale,
				style: {
					transformOrigin: 'top left',
					width: `${width}px`,
					height: `${height}px`
				},
				// Filter out problematic elements for Safari
				filter: (node: Node) => {
					if (node.nodeType === Node.ELEMENT_NODE) {
						const element = node as Element;
						// Skip spinning animations that can cause issues
						if (element.classList.contains('animate-spin')) {
							return false;
						}
						// For Safari, skip overly complex nested elements in waves
						if (isSafari && element.classList.contains('size-1')) {
							return false;
						}
					}
					return true;
				},
				// Adjust cloned nodes for better Safari compatibility  
				adjustClonedNode: (originalNode: Node, clonedNode: Node, after: boolean) => {
					if (!after && clonedNode.nodeType === Node.ELEMENT_NODE) {
						const element = clonedNode as HTMLElement;
						// Remove transforms that might cause Safari issues
						if (isSafari && element.style.transform && element.style.transform.includes('scale(var(')) {
							element.style.transform = 'none';
						}
					}
					return clonedNode;
				},
				copyDefaultStyles: false, // Faster processing
				useCORS: true
			};

			// Use dom-to-image-more for better Safari performance
			const blob = await domtoimage.toBlob(optimizedElement, options);
			return blob;
		} finally {
			// Clean up temporary element
			document.body.removeChild(optimizedElement);
		}
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
