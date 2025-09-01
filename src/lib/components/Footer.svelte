<script lang="ts">
	import XDark from '$lib/assets/X-dark.svg';
	import XLight from '$lib/assets/X-light.svg';
	import CoffeeDark from '$lib/assets/coffee-dark.svg';
	import CoffeeLight from '$lib/assets/coffee-light.svg';
	import { m } from '$lib/paraglide/messages';
</script>

<footer class="mx-auto flex w-full max-w-2xl flex-row items-center justify-center gap-6 p-6">
	<a
		href="https://x.com/F1RadioMeme"
		class="flex flex-none items-center gap-2 underline"
		title={m['footer.follow_us_title']()}
		target="_blank"
	>
		<picture>
			<source srcset={XLight} media="(prefers-color-scheme: light)" />
			<source srcset={XDark} media="(prefers-color-scheme: dark)" />
			<img src={XLight} height="16" width="16" alt={m['footer.x_logo_alt']()} />
		</picture>
		{m['footer.follow_us']()}
	</a>

	<a
		href="https://buymeacoffee.com/pmairoldi"
		class="flex flex-none items-center gap-2 underline"
		title={m['footer.buy_coffee_title']()}
		target="_blank"
	>
		<picture>
			<source srcset={CoffeeLight} media="(prefers-color-scheme: light)" />
			<source srcset={CoffeeDark} media="(prefers-color-scheme: dark)" />
			<img src={CoffeeLight} height="24" width="24" alt={m['footer.coffee_logo_alt']()} />
		</picture>
		{m['footer.buy_coffee']()}
	</a>
</footer>
