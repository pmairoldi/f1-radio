// import fs from 'fs';
import satori from 'satori';
import type { RequestHandler } from './$types';
import { Resvg } from '@resvg/resvg-js';

import { messageBox } from '$lib/renderers/message-box';

import f1Regular from '$lib/fonts/Formula1-Display-Regular.woff';

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

const teams = [
	'Red Bull Racing',
	'Mercedes',
	'Ferrari',
	'Aston Martin',
	'McLaren',
	'Alpine',
	'Williams',
	'Haas F1 Team',
	'Alfa Romeo',
	'AlphaTauri'
] as const;

const colors: Record<(typeof teams)[number], string> = {
	'Red Bull Racing': '#3671C6',
	Mercedes: '#6CD3BF',
	Ferrari: '#F91536',
	'Aston Martin': '#358C75',
	McLaren: '#F58020',
	Alpine: '#2293D1',
	Williams: '#37BEDD',
	'Haas F1 Team': '#B6BABD',
	'Alfa Romeo': '#C92D4B',
	AlphaTauri: '#5E8FAA'
};

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

export const GET: RequestHandler = async () => {
	const driver = 'Verstappen';
	const team = {
		name: 'Red Bull Racing',
		color: colors['Red Bull Racing']
		// logo: logos['Red Bull Racing']
	};
	const messages: { type: 'driver' | 'team'; message: string }[] = [
		{ type: 'driver', message: 'The car is 100% broken' }
	];

	const svg = await satori(messageBox({ driver, team, messages }), {
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
