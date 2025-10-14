import { fail } from '@sveltejs/kit';

import type { Actions } from './$types';
import { auth } from '$lib/server/auth';

export const actions = {
	default: async (event) => {
		const { request } = event;
		const formData = await request.formData();

		const email = formData.get('email');

		if (!email) {
			return fail(400, { email, missing: true });
		}

		try {
			await auth.api.forgetPassword({
				body: {
					email: email as string
				}
			});
		} catch (error) {
			return { error: error instanceof Error ? error.message : 'Unknown error' };
		}

		return { success: true };
	}
} satisfies Actions;
