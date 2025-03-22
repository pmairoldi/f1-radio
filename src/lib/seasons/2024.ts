import alpine_logo from '$lib/assets/alpine-logo.png';
import aston_martin_logo from '$lib/assets/aston-martin-logo.png';
import ferrari_logo from '$lib/assets/ferrari-logo.png';
import haas_logo from '$lib/assets/haas-logo.png';
import kick_logo from '$lib/assets/kick-logo.png';
import mclaren_logo from '$lib/assets/mclaren-logo.png';
import mercedes_logo from '$lib/assets/mercedes-logo.png';
import rb_logo from '$lib/assets/rb-logo.png';
import red_bull_racing_logo from '$lib/assets/red-bull-racing-logo.png';
import williams_logo from '$lib/assets/williams-logo.png';
import type { Driver, Team } from '../types';

export const teams = {
	red_bull_racing: {
		name: 'Red Bull Racing',
		color: '#1e5bc6',
		logo: red_bull_racing_logo
	},
	mercedes: {
		name: 'Mercedes',
		color: '#6cd3bf',
		logo: mercedes_logo
	},
	ferrari: {
		name: 'Ferrari',
		color: '#ed1c24',
		logo: ferrari_logo
	},
	aston_martin: {
		name: 'Aston Martin',
		color: '#2d826d',
		logo: aston_martin_logo
	},
	mclaren: {
		name: 'McLaren',
		color: '#f58020',
		logo: mclaren_logo
	},
	alpine: {
		name: 'Alpine',
		color: '#2293d1',
		logo: alpine_logo
	},
	williams: {
		name: 'Williams',
		color: '#37bedd',
		logo: williams_logo
	},
	haas: {
		name: 'Haas F1 Team',
		color: '#b6babd',
		logo: haas_logo
	},
	racing_bulls: {
		name: 'RB',
		color: '#6692FF',
		logo: rb_logo
	},
	kick: {
		name: 'Kick',
		color: '#52e252',
		logo: kick_logo
	}
} as const satisfies Record<string, Team>;

export const drivers = {
	max_verstappen: {
		number: 1,
		name: { first: 'Max', last: 'Verstappen', display: 'last' },
		team: teams['red_bull_racing']
	},
	lando_norris: {
		number: 4,
		name: { first: 'Lando', last: 'Norris', display: 'last' },
		team: teams['mclaren']
	},
	charles_leclerc: {
		number: 16,
		name: { first: 'Charles', last: 'Leclerc', display: 'last' },
		team: teams['ferrari']
	},
	oscar_piastri: {
		number: 81,
		name: { first: 'Oscar', last: 'Piastri', display: 'last' },
		team: teams['mclaren']
	},
	carlos_sainz: {
		number: 55,
		name: { first: 'Carlos', last: 'Sainz', display: 'last' },
		team: teams['ferrari']
	},
	george_russell: {
		number: 63,
		name: { first: 'George', last: 'Russell', display: 'last' },
		team: teams['mercedes']
	},
	lewis_hamilton: {
		number: 44,
		name: { first: 'Lewis', last: 'Hamilton', display: 'last' },
		team: teams['mercedes']
	},
	sergio_perez: {
		number: 11,
		name: { first: 'Sergio', last: 'Perez', display: 'last' },
		team: teams['red_bull_racing']
	},
	fernando_alonso: {
		number: 14,
		name: { first: 'Fernando', last: 'Alonso', display: 'last' },
		team: teams['aston_martin']
	},
	pierre_gasly: {
		number: 10,
		name: { first: 'Pierre', last: 'Gasly', display: 'last' },
		team: teams['alpine']
	},
	nico_hulkenberg: {
		number: 27,
		name: { first: 'Nico', last: 'Hulkenberg', display: 'last' },
		team: teams['haas']
	},
	yuki_tsunoda: {
		number: 22,
		name: { first: 'Yuki', last: 'Tsunoda', display: 'last' },
		team: teams['racing_bulls']
	},
	lance_stroll: {
		number: 18,
		name: { first: 'Lance', last: 'Stroll', display: 'last' },
		team: teams['aston_martin']
	},
	esteban_ocon: {
		number: 31,
		name: { first: 'Esteban', last: 'Ocon', display: 'last' },
		team: teams['alpine']
	},
	kevin_magnussen: {
		number: 20,
		name: { first: 'Kevin', last: 'Magnussen', display: 'last' },
		team: teams['haas']
	},
	alexander_albon: {
		number: 23,
		name: { first: 'Alexander', last: 'Albon', display: 'last' },
		team: teams['williams']
	},
	daniel_ricciardo: {
		number: 3,
		name: { first: 'Daniel', last: 'Ricciardo', display: 'last' },
		team: teams['racing_bulls']
	},
	oliver_bearman: {
		number: 28,
		name: { first: 'Oliver', last: 'Bearman', display: 'last' },
		team: teams['haas']
	},
	franco_colapinto: {
		number: 43,
		name: { first: 'Franco', last: 'Colapinto', display: 'last' },
		team: teams['williams']
	},
	zhou_guanyu: {
		number: 24,
		name: { first: 'Zhou', last: 'Guanyu', display: 'first' },
		team: teams['kick']
	},
	liam_lawson: {
		number: 30,
		name: { first: 'Liam', last: 'Lawson', display: 'last' },
		team: teams['racing_bulls']
	},
	valtteri_bottas: {
		number: 77,
		name: { first: 'Valtteri', last: 'Bottas', display: 'last' },
		team: teams['kick']
	},
	logan_sargeant: {
		number: 2,
		name: { first: 'Logan', last: 'Sargeant', display: 'last' },
		team: teams['williams']
	},
	jack_doohan: {
		number: 7,
		name: { first: 'Jack', last: 'Doohan', display: 'last' },
		team: teams['alpine']
	}
} as const satisfies Record<string, Driver>;
