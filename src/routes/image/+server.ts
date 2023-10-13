// import fs from 'fs';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import type { RequestHandler } from './$types';

import { messageBox } from '$lib/renderers/message-box';

import { drivers, type Messages } from '$lib/data';
import f1Regular from '$lib/fonts/Formula1-Display-Regular.woff';
import { error } from '@sveltejs/kit';

// import alfa_romeo_logo from '$lib/assets/alfa-romeo-logo.png';
// import alphatauri_logo from '$lib/assets/alphatauri-logo.png';
// import alpine_logo from '$lib/assets/alpine-logo.png';
// import aston_martin_logo from '$lib/assets/aston-martin-logo.png';
// import ferrari_logo from '$lib/assets/ferrari-logo.png';
// import haas_f1_team_logo from '$lib/assets/haas-f1-team-logo.png';
// import mclaren_logo from '$lib/assets/mclaren-logo.png';
// import mercedes_logo from '$lib/assets/mercedes-logo.png';
// import red_bull_racing_logo from '$lib/assets/red-bull-racing-logo.png';
// import williams_logo from '$lib/assets/williams-logo.png';

// function toBase64(src: string): string {
// 	const file = fs.readFileSync(`.${src}`);
// 	const base64 = file.toString('base64');

// 	return `data:image/png;base64,${base64}`;
// }

// const logos: Record<(typeof teams)[number], string> = {
// 	'Red Bull Racing': toBase64(red_bull_racing_logo),
// 	Mercedes: toBase64(mercedes_logo),
// 	Ferrari: toBase64(ferrari_logo),
// 	'Aston Martin': toBase64(aston_martin_logo),
// 	McLaren: toBase64(mclaren_logo),
// 	Alpine: toBase64(alpine_logo),
// 	Williams: toBase64(williams_logo),
// 	'Haas F1 Team': toBase64(haas_f1_team_logo),
// 	'Alfa Romeo': toBase64(alfa_romeo_logo),
// 	AlphaTauri: toBase64(alphatauri_logo)
// };

export const GET: RequestHandler = async (event) => {
	const query = event.url.searchParams;
	const d = query.get('d');
	const m = query.get('m');

	if (d == null || m == null) {
		throw error(400, `Invalid query parameters.`);
	}

	const driver = drivers.find(
		(driver) => d === `${driver.name.first}_${driver.name.last}`.toLowerCase()
	);

	if (driver == null) {
		throw error(404, `Driver not found!`);
	}

	const messages: Messages = JSON.parse(m);

	const name = driver.name.display === 'first' ? driver.name.first : driver.name.last;
	const team = driver.team;

	const svg = await satori(messageBox({ driver: name, team: team, messages }), {
		width: 320,
		fonts: [
			{
				name: 'Formula1',
				data: Buffer.from(f1Regular),
				weight: 400,
				style: 'normal'
			}
		]
		// debug: true
	});

	const resvg = new Resvg(svg, {
		textRendering: 2,
		imageRendering: 0,
		shapeRendering: 2
	});
	const pngData = resvg.render();
	const pngBuffer = pngData.asPng();

	return new Response(pngBuffer, { headers: { 'Content-Type': 'image/png' } });
};
