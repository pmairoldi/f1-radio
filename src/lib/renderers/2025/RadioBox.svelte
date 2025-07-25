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
				top.push(110 - 75 * offset);
			}

			const bottom = new Array<number>();
			for (let row = 0; row <= bottomHeight; ++row) {
				const offset = cubicIn(row / bottomHeight);
				bottom.push(110 - 75 * offset);
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
	class="font-f1 flex w-[320px] flex-col overflow-clip bg-gray-900 [font-variant-ligatures:none]"
	bind:this={element}
	style="--team-color: {team.color}; --light-team-color: color-mix(in oklab, var(--team-color), white); will-change: transform;"
>
	<div class="relative z-0 flex flex-col p-3">
		<div class="flex flex-row items-center justify-end">
			<span class="text-4xl leading-none font-bold text-[var(--team-color)] uppercase">
				{name.display === 'first' ? name.first : name.last}
			</span>
		</div>
		<div class="flex flex-row items-center justify-end">
			<span class="text-4xl leading-none font-black text-white uppercase"> Radio </span>
		</div>
		<div class="flex flex-row items-center justify-between">
			<span
				class="font-kh-interference-f1 bg-gradient-to-tl from-[var(--light-team-color)] to-[var(--team-color)] to-60% bg-clip-text text-7xl font-black text-transparent"
			>
				{driver.number}
			</span>
			<div class="flex h-16 w-16 justify-end">
				<img src={team.logo} alt={team.name} class="max-h-full max-w-full object-contain" />
			</div>
		</div>

		<div class="absolute start-0 end-0 -bottom-6 -z-10 grid grid-cols-9 items-end">
			{#each wave as item}
				<div class="row-start-1 flex h-12 flex-row">
					{#each item.top as column}
						<div class="flex flex-col-reverse items-center">
							{#each column as row}
								<div
									class="size-1 flex-none scale-[var(--intensity)] rounded-full bg-[var(--team-color)]/80"
									style="--intensity: {row}%"
								></div>
							{/each}
						</div>
					{/each}
				</div>

				<div class="row-start-2 flex h-6 -scale-y-[1] flex-row self-start">
					{#each item.bottom as column}
						<div class="flex flex-col-reverse items-center">
							{#each column as row}
								<div
									class="size-1 flex-none scale-[var(--intensity)] rounded-full bg-[var(--team-color)]/20"
									style="--intensity: {row}%"
								></div>
							{/each}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div class="flex flex-col gap-4 px-3 py-6 text-2xl leading-[1.2] uppercase">
		{@render children?.()}
	</div>

	<footer class="text-opacity-50 w-full pb-2 text-center text-sm text-white">@F1RadioMeme</footer>
</div>
