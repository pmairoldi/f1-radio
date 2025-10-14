import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { sendEmail } from './email';
import { emailTemplates } from './email/templates';
import { BETTER_AUTH_URL } from '$env/static/private';
import { autumn } from 'autumn-js/better-auth';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg'
	}),
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url }) => {
			try {
				const resetPasswordUrl = `${BETTER_AUTH_URL}${url}`;
				const email = emailTemplates.resetPassword(resetPasswordUrl);

				await sendEmail({
					to: user.email,
					...email
				});
			} catch (error) {
				console.error('Failed to send reset password email:', error);
			}
		}
	},
	plugins: [autumn(), sveltekitCookies(getRequestEvent)]
});
