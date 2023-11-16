<script lang="ts">
	import { page } from '$app/stores';
	import { drivers, type Driver, type Messages } from '$lib';
	import RadioBox from '$lib/renderers/RadioBox.svelte';
	import domtoimage from 'dom-to-image';
	import type { FormEventHandler } from 'svelte/elements';

	let output: HTMLElement | undefined;

	let driver: Driver | null = drivers[0];

	let messages: Messages = [
		{ type: 'driver', message: "You've given me a hell of a gap to close" },
		{ type: 'team', message: 'copy, lewis. Just see what we can do' }
	];

	const formChange: FormEventHandler<HTMLFormElement> = (event) => {
		const form = new FormData(event.currentTarget);

		const d = form.get('driver') as string | null;
		const m = form.getAll('messages') as string[] | null;

		if (d != null) {
			driver = drivers.find((driver) => driver.id === d) ?? null;
		} else {
			driver = null;
		}

		if (m != null) {
			const newMessage: Messages = [];
			for (let i = 0; i < m.length; i += 2) {
				const type = m[i] as 'driver' | 'team';
				const message = m[i + 1];

				newMessage.push({ type: type, message: message });
			}

			messages = newMessage;
		} else {
			messages = [];
		}
	};

	function addMessage() {
		const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
		if (lastMessage?.type === 'driver') {
			messages.push({ type: 'team', message: '' });
		} else if (lastMessage?.type === 'team') {
			messages.push({ type: 'driver', message: '' });
		} else {
			messages.push({ type: 'driver', message: '' });
		}
		messages = messages;
	}

	function removeMessage(index: number) {
		messages.splice(index, 1);
		messages = messages;
	}

	let copying: boolean = false;
	async function copy() {
		if (output == null) {
			return;
		}

		copying = true;
		try {
			const { offsetWidth, offsetHeight } = output;
			await navigator.clipboard.write([
				new ClipboardItem({
					'image/png': domtoimage.toBlob(output, {
						width: offsetWidth * 3,
						height: offsetHeight * 3,
						style: { zoom: 3 }
					})
				})
			]);

			copying = false;
		} catch (error) {
			console.error('oops, something went wrong!', error);
			copying = false;
		}
	}

	//TODO: make better
	function init(el: HTMLElement) {
		el.focus();
	}
</script>

<header class="p-4 text-white bg-red-700">
	<h1 class="text-3xl font-f1 max-w-2xl mx-auto">F1 Radio Meme</h1>
</header>

<main class="p-4 font-f1">
	<div class=" grid grid-cols-1 gap-4 w-full max-w-2xl mx-auto justify-items-center">
		<h2 class="w-full text-lg">
			Generate funny f1 radio meme and copy the image to post to your favorite website!
		</h2>
		<form on:input={formChange} autocomplete="off" class="flex flex-col gap-4 w-full">
			<label class="flex flex-col">
				<span>Pick a driver:</span>
				<select
					value={driver?.id ?? ''}
					name="driver"
					class="text-white bg-red-700 p-2 appearance-none rounded-xl"
				>
					<option value="">&ndash;</option>
					{#each drivers as driver}
						<option value={driver.id}>
							{#if driver.name.display === 'first'}
								{driver.name.first}
							{:else}
								{driver.name.last}
							{/if}
						</option>
					{/each}
				</select>
			</label>

			<div class="flex flex-col gap-2">
				<span>Messages:</span>
				{#each messages as message, i}
					<div class="flex flex-row items-center gap-2">
						<select
							value={message.type}
							name="messages"
							class="text-white bg-red-700 p-2 appearance-none rounded-xl"
						>
							<option value="driver">Driver</option>
							<option value="team">Team</option>
						</select>
						<span>:</span>
						<input
							type="text"
							value={message.message}
							name="messages"
							class="w-full flex-auto text-white bg-red-700 p-2 appearance-none rounded-xl"
							use:init
						/>
						<button type="button" on:click={() => removeMessage(i)}>X</button>
					</div>
				{/each}
			</div>

			<button
				type="button"
				on:click={() => addMessage()}
				class="bg-red-700 text-white p-2 rounded-xl"
			>
				Add Message
			</button>
		</form>

		{#if driver != null}
			<hr class="w-full" />
			<RadioBox {driver} {messages} bind:element={output} />

			<button
				type="button"
				class="bg-red-700 text-white p-2 rounded-xl"
				on:click={() => copy()}
				disabled={copying}
			>
				Copy
			</button>
		{/if}
	</div>
</main>

<style>
	select {
		padding-right: 28px;
		background-image: linear-gradient(45deg, transparent 50%, white 50%),
			linear-gradient(135deg, white 50%, transparent 50%);
		background-position: calc(100% - 15px) calc(1em + 2px), calc(100% - 10px) calc(1em + 2px);
		background-size: 5px 5px, 5px 5px;
		background-repeat: no-repeat;
	}
</style>
