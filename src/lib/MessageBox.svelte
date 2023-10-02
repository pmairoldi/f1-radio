<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let team: string;
	export let name: string;
	export let message: string;
	export let color: string;
</script>

<div class={twMerge('flex flex-col bg-slate-950 uppercase text-end w-72 font-f1', color)}>
	<div class="flex flex-col p-4 bg-gradient-to-b from-white/20">
		<span class="text-3xl italic">{name}</span>
		<span class="text-white tracking-wide text-base">{team}</span>
	</div>
	<hr class="border-current border-[1.5px]" />
	<div class="italic p-4 text-xl bg-gradient-to-b from-white/20">"{message}"</div>
</div>
