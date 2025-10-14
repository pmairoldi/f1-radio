import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { redirect } from '@sveltejs/kit';

const authHandle: Handle = async function ({ event, resolve }) {
	if (event.route.id?.startsWith('/(protected)')) {
		const authentication = await auth.api.getSession({
			headers: event.request.headers
		});

		if (authentication) {
			event.locals.authentication = authentication;

			return svelteKitHandler({ event, resolve, auth, building });
		} else {
			redirect(307, '/sign-in');
		}
	} else {
		return svelteKitHandler({ event, resolve, auth, building });
	}
};

const paraglideHandle: Handle = function ({ event, resolve }) {
	return paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		return resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('%lang%', locale);
			}
		});
	});
};

export const handle: Handle = sequence(authHandle, paraglideHandle);
