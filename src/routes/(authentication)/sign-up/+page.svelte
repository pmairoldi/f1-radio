<script lang="ts">
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<form method="POST" class="mx-auto flex max-w-md flex-col gap-2 p-4">
	<h1 class="text-2xl font-bold">Sign up</h1>
	<label class="flex flex-col gap-2">
		Name
		<input
			name="name"
			type="text"
			required
			class="rounded-md border border-gray-300 p-2"
			value={form?.name}
		/>
	</label>
	<label class="flex flex-col gap-2">
		Email
		<input
			name="email"
			type="email"
			required
			class="rounded-md border border-gray-300 p-2"
			value={form?.email}
		/>
	</label>
	<label class="flex flex-col gap-2">
		Password
		<input name="password" type="password" required class="rounded-md border border-gray-300 p-2" />
	</label>

	<button class="rounded-md bg-blue-500 p-2 text-white"> Sign up </button>

	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}
</form>
