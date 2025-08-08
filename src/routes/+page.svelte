<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { RadioBox, RadioBoxMessage } from '$lib/renderers/current';
	import { drivers as _drivers } from '$lib/seasons/current';
	import { type Message, type Name } from '$lib/types';
	import { onMount } from 'svelte';
	import type { FormEventHandler } from 'svelte/elements';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { driver } = $derived(data);
	let { messages } = $derived(data);

	let output = $state<HTMLElement | undefined>();

	const drivers = Object.entries(_drivers).flatMap(([key, value]) => {
		return { key: key, value: value };
	});

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
				const text = m[i + 1];
				newMessage.push({ type: type, text: text });
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
			messages.push({ type: 'team', text: '' });
		} else if (lastMessage?.type === 'team') {
			messages.push({ type: 'driver', text: '' });
		} else {
			messages.push({ type: 'driver', text: '' });
		}

		setQuery({ messages });
	}

	function removeMessage(index: number) {
		messages.splice(index, 1);
		setQuery({ messages });
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
		const url = new URL(page.url);
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
					searchParams.append('m', `${m.type}:${m.text}`);
				});
			} else {
				searchParams.delete('m');
			}
		}

		goto(url, { replaceState: true, keepFocus: true, invalidateAll: true });
	}
</script>

{#snippet name(name: Name)}
	{#if name.display === 'first'}
		{name.last} {name.first}
	{:else}
		{name.first} {name.last}
	{/if}
{/snippet}

<SEO
	title="F1 Radio Meme"
	description="Generate funny f1 radio memes and copy the image to post to your favorite website!"
	name="F1RadioMeme"
	url="https://f1radiomeme.com"
	imageUrl="https://f1radiomeme.com/OG.png"
/>

<Header />

<main class="font-f1 flex-auto p-4">
	<div class=" mx-auto grid w-full max-w-2xl grid-cols-1 justify-items-center gap-4">
		<h2 class="flex w-full items-center">
			Generate funny f1 radio memes and copy the image to post to your favorite website!
		</h2>
		<form
			oninput={onFormChange}
			onsubmit={(event) => event.preventDefault()}
			autocomplete="off"
			class="flex w-full flex-col gap-4"
		>
			<label class="flex flex-col">
				<span>Pick a driver:</span>
				<select
					value={driver?.key ?? ''}
					name="driver"
					class="appearance-none rounded-xl bg-red-700 p-2 text-white"
				>
					<option value="">&ndash;</option>
					{#each drivers as d (d.key)}
						<option value={d.key} selected={driver?.key === d.key}>
							{@render name(d.value.name)}
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
							class="appearance-none rounded-xl bg-red-700 p-2 text-white"
							aria-label="Pick to enter drive or team message"
						>
							<option value="driver" selected={message.type === 'driver'}>Driver</option>
							<option value="team" selected={message.type === 'team'}>Team</option>
						</select>
						<span>:</span>
						<div class="flex flex-auto items-center overflow-clip rounded-xl bg-red-700 text-white">
							<input
								type="text"
								value={message.text}
								name="messages"
								class="w-full appearance-none bg-inherit p-2"
								aria-label="Enter a message"
								use:init
							/>
							{#if i !== 0}
								<button class="p-2" type="button" onclick={() => removeMessage(i)}>X</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<button
				type="button"
				onclick={() => addMessage()}
				class="rounded-xl bg-red-700 p-2 text-white"
			>
				Add Message
			</button>
		</form>

		{#if driver != null}
			<hr class="w-full border-gray-300 dark:border-gray-700" />
			<div class="border border-red-300 dark:border-gray-700">
				<RadioBox driver={driver.value} bind:element={output}>
					{#each messages as message}
						<RadioBoxMessage type={message.type} text={message.text} />
					{/each}
				</RadioBox>
			</div>

			<CopyButton element={output} />
		{/if}
	</div>
</main>

<Footer />

<style>
	select {
		padding-right: 28px;
		background-image:
			linear-gradient(45deg, transparent 50%, white 50%),
			linear-gradient(135deg, white 50%, transparent 50%);
		background-position:
			calc(100% - 15px) calc(1em + 2px),
			calc(100% - 10px) calc(1em + 2px);
		background-size:
			5px 5px,
			5px 5px;
		background-repeat: no-repeat;
	}
</style>
