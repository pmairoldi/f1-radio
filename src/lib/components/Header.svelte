<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
</script>

<header class="sticky top-0 z-20 flex-none bg-red-700 p-4 text-white">
	<nav class="mx-auto flex w-full max-w-2xl items-center justify-between gap-2 sm:gap-4">
		<a
			href={localizeHref('/')}
			class="rounded outline-2 outline-offset-4 outline-white outline-none focus-visible:outline-solid"
			title={m['header.title_home']()}
		>
			<h1 class="font-f1 flex-auto text-2xl sm:text-3xl">F1 Radio Meme</h1>
		</a>

		<div class="flex flex-none items-center gap-2 sm:gap-4">
			<a
				href={localizeHref('/blog')}
				class="flex flex-none items-center gap-1 rounded-lg border border-white bg-white px-2 py-1 text-red-700 outline-2 outline-offset-2 outline-white transition-colors outline-none hover:bg-red-700 hover:text-white focus-visible:outline-solid"
				title={m['header.blog_title']()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
					class="max-sm:hidden"
				>
					<path d="M15 18h-5" /><path d="M18 14h-8" /><path
						d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"
					/>
					<rect width="8" height="4" x="10" y="6" rx="1" />
				</svg>
				{m['header.blog']()}
			</a>

			<a
				href="https://buymeacoffee.com/f1radiomeme"
				class="flex flex-none items-center gap-1 rounded-lg border border-white bg-white px-2 py-1 text-red-700 outline-2 outline-offset-2 outline-white transition-colors outline-none hover:bg-red-700 hover:text-white focus-visible:outline-solid"
				target="_blank"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
					class="max-sm:hidden"
				>
					<path
						d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"
					/>
					<path d="M16 10h.01" />
					<path d="M2 8v1a2 2 0 0 0 2 2h1" />
				</svg>

				{m['footer.donate']()}
			</a>
		</div>
	</nav>
</header>
