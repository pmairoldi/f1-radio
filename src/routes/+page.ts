import { drivers, type Message } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const d = url.searchParams.get('d');
	const m = url.searchParams.getAll('m');

	return {
		driver: drivers.find((driver) => driver.id === d) ?? null,
		messages: m.map((m) => {
			const [type, message] = m.split(':');
			return { type: type, message: message };
		}) as Message[]
	};
};
