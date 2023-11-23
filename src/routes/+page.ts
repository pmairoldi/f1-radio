import { drivers, type Driver, type Message } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const d = url.searchParams.get('d');
	const m = url.searchParams.getAll('m');

	const driver = drivers.find((driver) => driver.id === d) ?? null;
	const messages = m.map((m) => {
		const [type, message] = m.split(':');
		return { type: type, message: message };
	}) as Message[];

	return {
		driver: driver,
		messages: messages.length === 0 ? [{ type: 'driver', message: '' }] : messages
	} satisfies { driver: Driver | null; messages: Message[] };
};
