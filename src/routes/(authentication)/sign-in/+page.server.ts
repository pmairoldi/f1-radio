import { fail } from '@sveltejs/kit';

import type { Actions } from './$types';
import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const { request } = event;
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');

		if (!email || !password) {
			return fail(400, { email, missing: true });
		}

		try {
			await auth.api.signInEmail({
				body: {
					email: email as string,
					password: password as string
				}
			});
		} catch (error) {
			console.error('signin error: ', error);
			return { error: error instanceof Error ? error.message : 'Unknown error' };
		}

		redirect(303, '/');
	}
} satisfies Actions;
