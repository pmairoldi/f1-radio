import type { Handle, HandleServerError } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { sequence } from '@sveltejs/kit/hooks';
import { posthogHandle, createPosthogClient } from '$lib/posthog/server';

export const handleError: HandleServerError = async function (input) {
	const { error, status, message, event } = input;

	if (status !== 404) {
		const posthog = createPosthogClient();

		posthog.captureException(error, undefined, {
			status: status,
			message: message,
			url: event.url.toString()
		});

		await posthog.shutdown();
	}

	return {
		message: message
	};
};

const paraglideHandle: Handle = ({ event, resolve }) => {
	return paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		return resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('%lang%', locale);
			}
		});
	});
};

export const handle: Handle = sequence(paraglideHandle, posthogHandle);
