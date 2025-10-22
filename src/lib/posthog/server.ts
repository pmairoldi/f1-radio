import type { Handle } from '@sveltejs/kit';
import { PostHog } from 'posthog-node';
import { PUBLIC_POSTHOG_KEY } from '$env/static/public';

export const posthog = new PostHog(PUBLIC_POSTHOG_KEY, {
	host: 'https://us.i.posthog.com'
});

export const posthogHandle: Handle = async function ({ event, resolve }) {
	const { pathname } = event.url;

	if (pathname.startsWith('/relay-ujOT')) {
		// Determine target hostname based on static or dynamic ingestion
		const hostname = pathname.startsWith('/relay-ujOT/static/')
			? 'us-assets.i.posthog.com'
			: 'us.i.posthog.com';

		// Build external URL
		const url = new URL(event.request.url);
		url.protocol = 'https:';
		url.hostname = hostname;
		url.port = '443';
		url.pathname = pathname.replace('/relay-ujOT/', '');

		// Clone and adjust headers
		const headers = new Headers(event.request.headers);
		headers.set('Accept-Encoding', '');
		headers.set('host', hostname);

		// Proxy the request to the external host
		const response = await event.fetch(url.toString(), {
			method: event.request.method,
			headers,
			body: event.request.body,
			// @ts-expect-error - duplex is not a valid property of RequestInit
			duplex: 'half'
		});

		return response;
	}

	const response = await resolve(event);
	return response;
};
