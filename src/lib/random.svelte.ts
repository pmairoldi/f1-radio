import { getContext, setContext } from 'svelte';

const key = Symbol();

export function injectRandom(): Random {
	return getContext<Random>(key);
}

export function provideRandom(number: number): Random {
	const random = new Random(number);
	setContext(key, random);
	return random;
}

export class Random {
	private random$: number;

	constructor(random: number) {
		this.random$ = $state(random);
	}

	update(random: number) {
		this.random$ = random;
	}

	get() {
		return this.random$;
	}
}
