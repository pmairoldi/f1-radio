<script lang="ts">
	import XDark from '$lib/assets/X-dark.svg';
	import XLight from '$lib/assets/X-light.svg';
	import { m } from '$lib/paraglide/messages';
</script>

<footer class="mx-auto flex w-full max-w-2xl flex-col items-center gap-6 p-6">
	<section class="flex flex-row items-center justify-center gap-6">
		<a
			href="https://x.com/F1RadioMeme"
			class="flex flex-none items-center gap-2 rounded underline outline-2 outline-offset-4 outline-red-700 outline-none focus-visible:outline-solid"
			target="_blank"
		>
			<picture>
				<source srcset={XLight} media="(prefers-color-scheme: light)" />
				<source srcset={XDark} media="(prefers-color-scheme: dark)" />
				<img src={XLight} height="16" width="16" alt="" aria-hidden="true" />
			</picture>
			{m['footer.follow_us']()}
		</a>
	</section>

	<p class="text-center text-xs text-gray-500">
		{m['footer.disclaimer']()}
	</p>
</footer>
