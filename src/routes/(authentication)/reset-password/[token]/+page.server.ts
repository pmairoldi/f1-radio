import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import { auth } from '$lib/server/auth';

export const actions = {
	default: async (event) => {
		const { request } = event;
		const formData = await request.formData();

		const newPassword = formData.get('newPassword');
		const confirmPassword = formData.get('confirmPassword');

		if (!newPassword || !confirmPassword) {
			return fail(400, { missing: true });
		}

		if (newPassword !== confirmPassword) {
			return fail(400, { mismatch: true });
		}

		try {
			await auth.api.resetPassword({
				body: {
					newPassword: newPassword as string,
					token: event.params.token
				}
			});
		} catch (error) {
			return { error: error instanceof Error ? error.message : 'Unknown error' };
		}

		redirect(303, '/sign-in');
	}
} satisfies Actions;
