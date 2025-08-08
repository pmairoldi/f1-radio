/** @type {import('./$types').LayoutServerLoad} */
export async function load() {
	return {
		random: Math.random()
	};
}
