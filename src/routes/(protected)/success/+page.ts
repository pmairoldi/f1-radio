import type { PageLoad } from './$types';
import { authClient } from '$lib/client/auth';

export const load = async function () {
	console.log(authClient);
	return { subscriptions: [{ id: '123' }] };
} satisfies PageLoad;
