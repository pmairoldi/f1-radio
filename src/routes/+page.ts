import { drivers } from '$lib/seasons/2024';
import { type Driver, type Message } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const d = url.searchParams.get('d') as keyof typeof drivers | null;
	const m = url.searchParams.getAll('m');

	const driver = d != null ? (drivers[d] ?? null) : null;
	const messages = m.map((m) => {
		const [type, text] = m.split(':');
		return { type: type, text: text };
	}) as Message[];

	return {
		driver: d != null && driver != null ? { key: d, value: driver } : null,
		messages: messages.length === 0 ? [{ type: 'driver', text: '' }] : messages
	} satisfies { driver: { key: keyof typeof drivers; value: Driver } | null; messages: Message[] };
};
