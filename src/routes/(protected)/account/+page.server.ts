import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (locals.authentication == null) {
		throw new Error('User not authenticated');
	}

	return { user: locals.authentication.user };
}) satisfies PageServerLoad;
