<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
</script>

<header class="sticky top-0 z-20 flex-none bg-red-700 p-4 text-white">
	<div class="mx-auto flex w-full max-w-2xl items-center justify-between gap-4">
		<a
			href={localizeHref('/')}
			class="rounded outline-2 outline-offset-4 outline-white outline-none focus-visible:outline-solid"
			title={m['header.title_home']()}
		>
			<h1 class="font-f1 flex-auto text-2xl sm:text-3xl">F1 Radio Meme</h1>
		</a>
		<div class="flex flex-none items-center gap-3">
			<a
				href={localizeHref('/blog')}
				class="flex flex-none gap-2 rounded-lg border border-white bg-white px-2 py-1 text-red-700 outline-2 outline-offset-2 outline-white transition-colors outline-none hover:bg-red-700 hover:text-white focus-visible:outline-solid"
				title={m['header.blog_title']()}
			>
				{m['header.blog']()}
			</a>

			<a
				href={localizeHref('/account')}
				class="flex flex-none origin-center items-center justify-center transition-transform hover:scale-95"
				title={m['header.profile_title']()}
				aria-label={m['header.profile_title']()}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-circle-user-round-icon lucide-circle-user-round size-8"
				>
					<path d="M18 20a6 6 0 0 0-12 0" />
					<circle cx="12" cy="10" r="4" />
					<circle cx="12" cy="12" r="10" />
				</svg>
			</a>
		</div>
	</div>
</header>
