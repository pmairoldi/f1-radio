<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { drivers, type Message } from '$lib';
	import X from '$lib/assets/X.svg';
	import RadioBox from '$lib/renderers/RadioBox.svelte';
	import domtoimage from 'dom-to-image';
	import { onMount } from 'svelte';
	import type { FormEventHandler } from 'svelte/elements';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ driver } = data);
	$: ({ messages } = data);

	let output: HTMLElement | undefined;

	const onFormChange: FormEventHandler<HTMLFormElement> = (event) => {
		const form = new FormData(event.currentTarget);
		const d = form.get('driver') as string | null;
		const m = form.getAll('messages') as string[] | null;

		const update: Partial<{ driver: string | null; messages: Message[] }> = {};
		update.driver = d;

		if (m != null) {
			const newMessage: Message[] = [];
			for (let i = 0; i < m.length; i += 2) {
				const type = m[i] as 'driver' | 'team';
				const message = m[i + 1];
				newMessage.push({ type: type, message: message });
			}
			update.messages = newMessage;
		} else {
			update.messages = [];
		}

		setQuery(update);
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

		setQuery({ messages });
	}

	function removeMessage(index: number) {
		messages.splice(index, 1);
		setQuery({ messages });
	}

	let copying: boolean = false;
	async function copy() {
		if (output == null) {
			return;
		}

		copying = true;
		try {
			const scale = 3;
			const { offsetWidth, offsetHeight } = output;

			await navigator.clipboard.write([
				new ClipboardItem({
					'image/png': domtoimage.toBlob(output, {
						height: offsetHeight * scale,
						width: offsetWidth * scale,
						style: {
							transform: `scale(${scale})`,
							transformOrigin: 'top left',
							width: `${offsetWidth}px`,
							height: `${offsetHeight}px`
						}
					})
				})
			]);

			copying = false;
		} catch (error) {
			console.error('oops, something went wrong!', error);
			copying = false;
		}
	}

	let mounted = false;
	onMount(() => {
		mounted = true;
	});

	function init(el: HTMLElement) {
		if (mounted) {
			el.focus();
		}
	}

	function setQuery(update: Partial<{ driver: string | null; messages: Message[] }>) {
		const url = new URL($page.url);
		const { searchParams } = url;
		const { driver, messages } = update;

		if (driver !== undefined) {
			if (driver != null) {
				searchParams.set('d', driver);
			} else {
				searchParams.delete('d');
			}
		}

		if (messages !== undefined) {
			if (messages.length > 0) {
				searchParams.delete('m');
				messages.forEach((m) => {
					searchParams.append('m', `${m.type}:${m.message}`);
				});
			} else {
				searchParams.delete('m');
			}
		}

		goto(url, { replaceState: true, keepFocus: true });
	}
</script>

<header class="p-4 text-white bg-red-700">
	<div class="max-w-2xl mx-auto flex items-center">
		<h1 class="text-3xl font-f1 flex-auto">F1 Radio Meme</h1>
		<a href="https://x.com/F1RadioMeme" class="flex-none" title="Follow us on X" target="_blank">
			<img src={X} height="26" width="26" alt="" aria-hidden="true" />
		</a>
	</div>
</header>

<main class="p-4 font-f1">
	<div class=" grid grid-cols-1 gap-4 w-full max-w-2xl mx-auto justify-items-center">
		<h2 class="w-full text-lg flex items-center">
			Generate funny f1 radio memes and copy the image to post to your favorite website!
		</h2>
		<form
			on:input={onFormChange}
			on:submit|preventDefault
			autocomplete="off"
			class="flex flex-col gap-4 w-full"
		>
			<label class="flex flex-col">
				<span>Pick a driver:</span>
				<select
					value={driver?.id ?? ''}
					name="driver"
					class="text-white bg-red-700 p-2 appearance-none rounded-xl"
				>
					<option value="">&ndash;</option>
					{#each drivers as d (d.id)}
						<option value={d.id} selected={driver?.id === d.id}>
							{#if d.name.display === 'first'}
								{d.name.last} {d.name.first}
							{:else}
								{d.name.first} {d.name.last}
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
							<option value="driver" selected={message.type === 'driver'}>Driver</option>
							<option value="team" selected={message.type === 'team'}>Team</option>
						</select>
						<span>:</span>
						<div class="flex-auto flex items-center text-white bg-red-700 rounded-xl overflow-clip">
							<input
								type="text"
								value={message.message}
								name="messages"
								class="w-full p-2 bg-inherit appearance-none"
								use:init
							/>
							{#if i !== 0}
								<button class="p-2" type="button" on:click={() => removeMessage(i)}>X</button>
							{/if}
						</div>
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
				class="bg-red-700 text-white p-2 rounded-xl flex items-center gap-1 disabled:opacity-70"
				on:click={() => copy()}
				disabled={copying}
			>
				{#if copying}
					<svg
						class="animate-spin h-4 w-4 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							class="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							stroke-width="4"
						/>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				{/if}
				{#if copying}
					Copying
				{:else}
					Copy
				{/if}
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
