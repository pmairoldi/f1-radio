<script lang="ts">
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<form method="POST" class="mx-auto flex max-w-md flex-col gap-2 p-4">
	<h1 class="text-2xl font-bold">Forget password</h1>
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

	<button class="rounded-md bg-blue-500 p-2 text-white"> Forget password </button>

	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}
</form>
