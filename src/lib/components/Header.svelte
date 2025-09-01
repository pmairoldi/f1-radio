<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime';
</script>

<header class="sticky top-0 z-10 flex-none bg-red-700 p-4 text-white">
	<div class="mx-auto flex w-full max-w-2xl items-center justify-between gap-4">
		<a href={localizeHref('/')} title={m['header.title_home']()}>
			<h1 class="font-f1 flex-auto text-2xl sm:text-3xl">F1 Radio Meme</h1>
		</a>
		<a
			href={localizeHref('/blog')}
			class="flex flex-none gap-2 rounded-lg border border-white bg-white px-2 py-1 text-red-700 transition-colors hover:bg-red-700 hover:text-white"
			title={m['header.blog_title']()}
		>
			{m['header.blog']()}
		</a>
	</div>
</header>
