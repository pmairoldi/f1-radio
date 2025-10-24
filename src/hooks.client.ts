import posthog from 'posthog-js';
import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = async function (input) {
	const { error, status, message, event } = input;

	if (status !== 404) {
		posthog.captureException(error, {
			status: status,
			message: message,
			url: event.url.toString()
		});
	}

	return {
		message: message
	};
};
