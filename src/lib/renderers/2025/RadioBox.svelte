<script lang="ts">
	import { SeededRandom } from '$lib/seeded-random';
	import type { Driver } from '$lib/types';
	import type { Snippet } from 'svelte';
	import { cubicIn } from 'svelte/easing';

	interface Props {
		driver: Driver;
		children?: Snippet;
		element?: HTMLElement | undefined;
	}

	let { driver, children, element = $bindable() }: Props = $props();
	let { name, team } = $derived(driver);

	const wave = $derived.by(() => {
		const random = new SeededRandom(
			`${driver.team.name}-${driver.number}-${driver.name.first}-${driver.name.last}`
		);

		const sine: number[] = [0, 0.383, 0.707, 0.924, 1, 0.924, 0.707, 0.383, 0];
		const wave = sine.map((v) => {
			const rand = random.next();
			const noise = (rand - 0.5) * 12;
			const normalized = (v + 1) * 24;

			const height = Math.max(0, Math.min(48, normalized + noise));
			const topHeight = Math.round(height / 4);
			const bottomHeight = topHeight / 2;

			const top = new Array<number>();
			for (let row = 0; row <= topHeight; ++row) {
				const offset = cubicIn(row / topHeight);
				top.push(130 - 80 * offset);
			}

			const bottom = new Array<number>();
			for (let row = 0; row <= bottomHeight; ++row) {
				const offset = cubicIn(row / bottomHeight);
				bottom.push(130 - 80 * offset);
			}

			return {
				top: [top, top, top, top, top, top, top, top, top],
				bottom: [bottom, bottom, bottom, bottom, bottom, bottom, bottom, bottom, bottom]
			};
		});

		return wave;
	});
</script>

<div
	class="font-f1 w-[320px] flex flex-col bg-gray-900 overflow-clip [font-variant-ligatures:none]"
	bind:this={element}
	style="--team-color: {team.color}; --light-team-color: color-mix(in oklab, var(--team-color), white);"
>
	<div class="flex flex-col p-3 relative z-0">
		<div class="flex flex-row items-center justify-end">
			<span class="leading-none font-bold uppercase text-4xl text-[var(--team-color)]">
				{name.display === 'first' ? name.first : name.last}
			</span>
		</div>
		<div class="flex flex-row items-center justify-end">
			<span class="leading-none font-bold uppercase text-4xl text-white"> Radio </span>
		</div>
		<div class="flex flex-row items-center justify-between">
			<span
				class="font-black text-6xl bg-gradient-to-tl from-[var(--light-team-color)] to-60% to-[var(--team-color)] text-transparent bg-clip-text"
			>
				{driver.number}
			</span>
			<div class="justify-end w-16 h-16 flex">
				<img src={team.logo} alt={team.name} class="max-w-full max-h-full object-contain" />
			</div>
		</div>

		<div class="grid grid-cols-9 absolute start-0 end-0 -bottom-6 items-end -z-10">
			{#each wave as item}
				<div class="flex flex-row row-start-1 h-12">
					{#each item.top as column}
						<div class="flex flex-col-reverse items-center">
							{#each column as row}
								<div
									class="size-1 rounded-full scale-[var(--intensity)] bg-[var(--team-color)]/80 flex-none"
									style="--intensity: {row}%"
								></div>
							{/each}
						</div>
					{/each}
				</div>

				<div class="flex flex-row self-start -scale-y-[1] row-start-2 h-6">
					{#each item.bottom as column}
						<div class="flex flex-col-reverse items-center">
							{#each column as row}
								<div
									class="size-1 rounded-full scale-[var(--intensity)] bg-[var(--team-color)]/20 flex-none"
									style="--intensity: {row}%"
								></div>
							{/each}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div class="flex flex-col px-3 py-6 uppercase text-2xl leading-[1.2] gap-4">
		{@render children?.()}
	</div>

	<footer class="text-white text-opacity-50 text-center w-full pb-2 text-sm">@F1RadioMeme</footer>
</div>
