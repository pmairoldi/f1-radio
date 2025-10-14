import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import { auth } from '$lib/server/auth';

export const actions = {
	default: async (event) => {
		const { request } = event;
		const formData = await request.formData();

		const name = formData.get('name');
		const email = formData.get('email');
		const password = formData.get('password');

		if (!name || !email || !password) {
			return fail(400, { name, email, missing: true });
		}

		try {
			await auth.api.signUpEmail({
				body: {
					name: name as string,
					email: email as string,
					password: password as string
				}
			});
		} catch (error) {
			return { error: error instanceof Error ? error.message : 'Unknown error' };
		}

		redirect(303, '/sign-in');
	}
} satisfies Actions;
