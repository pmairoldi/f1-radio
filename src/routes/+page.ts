import { drivers } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const d = url.searchParams.get('d');
	console.log(d);

	return {
		driver: drivers.find((driver) => driver.id === d) ?? null,
		messages: []
	};
};
