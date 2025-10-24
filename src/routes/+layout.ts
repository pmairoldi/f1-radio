import type { LayoutLoad } from './$types';
import { initPosthog } from '$lib/posthog/client';

export const load: LayoutLoad = async function () {
	initPosthog();
};
