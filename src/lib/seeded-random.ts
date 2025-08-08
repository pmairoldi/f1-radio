export class SeededRandom {
	private seed: number;

	constructor(seed: string) {
		this.seed = this.hashCode(seed);
	}

	next(min?: number, max?: number): number {
		const _min = min === null || min === undefined ? 0 : min;
		const _max = max === null || max === undefined ? 1 : max;

		return _min + this.generate() * (_max - _min);
	}

	nextInt(min?: number, max?: number): number {
		return Math.round(this.next(min, max));
	}

	// psuedo-random seeded number generator
	// https://en.wikipedia.org/wiki/Linear_congruential_generator
	private generate(): number {
		this.seed = (this.seed * 9301 + 49297) % 233280;
		const rnd = this.seed / 233280.0;

		return Math.abs(rnd);
	}

	// javascript implementation of java's hashCode
	// https://en.wikipedia.org/wiki/Java_hashCode()
	private hashCode(s: string): number {
		let hash = 0;

		if (s.length === 0) {
			return hash;
		}

		for (let i = 0, l = s.length; i < l; i++) {
			const char = s.charCodeAt(i);
			// eslint-disable-next-line no-bitwise
			hash = (hash << 5) - hash + char; // optimized version of 32^(n-1-i)
			// eslint-disable-next-line no-bitwise
			hash |= 0; // Convert to 32bit integer
		}

		return hash;
	}
}
