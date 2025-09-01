<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Button from '$lib/components/Button.svelte';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Select from '$lib/components/Select.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { m } from '$lib/paraglide/messages';
	import { RadioBox, RadioBoxMessage } from '$lib/renderers/current';
	import { drivers as _drivers } from '$lib/seasons/current';
	import { type Message, type Name } from '$lib/types';
	import { onMount } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
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
		const driver = form.get('driver') as string | null;
		const messages = form.getAll('messages') as string[] | null;

		const update: Partial<{ driver: string | null; messages: Message[] }> = {};
		update.driver = driver;

		if (messages != null) {
			const newMessage: Message[] = [];
			for (let i = 0; i < messages.length; i += 2) {
				const type = messages[i] as 'driver' | 'team';
				const text = messages[i + 1];
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

	const init: Attachment<HTMLElement> = (el: HTMLElement) => {
		if (mounted) {
			el.focus();
		}
	};

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
				messages.forEach((message) => {
					searchParams.append('m', `${message.type}:${message.text}`);
				});
			} else {
				searchParams.delete('m');
			}
		}

		goto(url, { replaceState: true, keepFocus: true, invalidateAll: true, noScroll: true });
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
	title={m['seo.title']()}
	description={m['seo.description']()}
	name={m['seo.site_name']()}
	url="https://f1radiomeme.com"
	imageUrl="https://f1radiomeme.com/OG.png"
/>

<Header />

<main class="font-f1 flex-auto p-4">
	<div class=" mx-auto grid w-full max-w-2xl grid-cols-1 justify-items-center gap-4">
		<h2 class="flex w-full items-center">
			{m['home.heading']()}
		</h2>
		<form
			oninput={onFormChange}
			onsubmit={(event) => event.preventDefault()}
			autocomplete="off"
			class="flex w-full flex-col gap-4"
		>
			<label class="flex flex-col">
				<span>{m['home.pick_a_driver']()}</span>
				<Select value={driver?.key ?? ''} name="driver">
					<option value="">&ndash;</option>
					{#each drivers as d (d.key)}
						<option value={d.key} selected={driver?.key === d.key}>
							{@render name(d.value.name)}
						</option>
					{/each}
				</Select>
			</label>

			<div class="flex flex-col gap-2">
				<span>{m['home.messages']()}</span>
				{#each messages as message, i}
					<div class="flex flex-row items-center gap-2">
						<Select
							value={message.type}
							name="messages"
							aria-label={m['home.aria.pick_message_type']()}
						>
							<option value="driver" selected={message.type === 'driver'}>
								{m['home.messages_driver']()}
							</option>
							<option value="team" selected={message.type === 'team'}>
								{m['home.messages_team']()}
							</option>
						</Select>
						<span>:</span>
						<div
							class="flex flex-auto items-center overflow-clip rounded-xl bg-red-700 text-white outline-2 outline-offset-2 outline-red-700 outline-none has-focus-visible:outline-solid"
						>
							<input
								type="text"
								value={message.text}
								name="messages"
								class="w-full appearance-none bg-inherit p-2 outline-none"
								aria-label={m['home.aria.enter_message']()}
								{@attach init}
							/>
							{#if i !== 0}
								<button
									class="group p-2 pe-3 outline-none"
									type="button"
									onclick={() => removeMessage(i)}
								>
									<span
										class="flex rounded-full leading-3.5 outline-1 outline-offset-5 outline-white outline-none group-focus-visible:outline-solid"
									>
										X
									</span>
								</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<Button type="button" onclick={() => addMessage()}>
				{m['home.add_message']()}
			</Button>
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
