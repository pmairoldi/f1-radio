<script lang="ts">
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<form method="POST" class="mx-auto flex max-w-md flex-col gap-2 p-4">
	<h1 class="text-2xl font-bold">Reset password</h1>
	<label class="flex flex-col gap-2">
		New password
		<input
			name="newPassword"
			type="password"
			required
			class="rounded-md border border-gray-300 p-2"
		/>
	</label>

	<label class="flex flex-col gap-2">
		Confirm new password
		<input
			name="confirmPassword"
			type="password"
			required
			class="rounded-md border border-gray-300 p-2"
		/>
	</label>

	<button class="rounded-md bg-blue-500 p-2 text-white"> Reset password </button>

	{#if form?.error}
		<p class="text-red-500">{form.error}</p>
	{/if}
</form>
