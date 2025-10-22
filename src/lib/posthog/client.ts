import { PUBLIC_POSTHOG_KEY } from '$env/static/public';
import { browser } from '$app/environment';
import posthog from 'posthog-js';

export function initPosthog() {
	if (!browser) {
		return;
	}

	posthog.init(PUBLIC_POSTHOG_KEY, {
		api_host: '/relay-ujOT',
		ui_host: 'https://us.posthog.com',
		person_profiles: 'always',
		persistence: 'localStorage'
	});
}
