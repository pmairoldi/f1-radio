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
	lando_norris: {
		id: '4',
		name: { first: 'Lando', last: 'Norris', display: 'last' },
		team: teams['mclaren']
	},
	oscar_piastri: {
		id: '81',
		name: { first: 'Oscar', last: 'Piastri', display: 'last' },
		team: teams['mclaren']
	},
	lewis_hamilton: {
		id: '44',
		name: { first: 'Lewis', last: 'Hamilton', display: 'last' },
		team: teams['ferrari']
	},
	charles_leclerc: {
		id: '16',
		name: { first: 'Charles', last: 'Leclerc', display: 'last' },
		team: teams['ferrari']
	},
	max_verstappen: {
		id: '1',
		name: { first: 'Max', last: 'Verstappen', display: 'last' },
		team: teams['red_bull_racing']
	},
	liam_lawson: {
		id: '30',
		name: { first: 'Liam', last: 'Lawson', display: 'last' },
		team: teams['red_bull_racing']
	},
	george_russell: {
		id: '63',
		name: { first: 'George', last: 'Russell', display: 'last' },
		team: teams['mercedes']
	},
	kimi_antonelli: {
		id: '63',
		name: { first: 'Kimi', last: 'Antonelli', display: 'last' },
		team: teams['mercedes']
	},
	fernando_alonso: {
		id: '14',
		name: { first: 'Fernando', last: 'Alonso', display: 'last' },
		team: teams['aston_martin']
	},
	lance_stroll: {
		id: '18',
		name: { first: 'Lance', last: 'Stroll', display: 'last' },
		team: teams['aston_martin']
	},
	pierre_gasly: {
		id: '10',
		name: { first: 'Pierre', last: 'Gasly', display: 'last' },
		team: teams['alpine']
	},
	jack_doohan: {
		id: '7',
		name: { first: 'Jack', last: 'Doohan', display: 'last' },
		team: teams['alpine']
	},
	oliver_bearman: {
		id: '87',
		name: { first: 'Oliver', last: 'Bearman', display: 'last' },
		team: teams['haas']
	},
	esteban_ocon: {
		id: '31',
		name: { first: 'Esteban', last: 'Ocon', display: 'last' },
		team: teams['haas']
	},
	yuki_tsunoda: {
		id: '22',
		name: { first: 'Yuki', last: 'Tsunoda', display: 'last' },
		team: teams['racing_bulls']
	},
	isack_hadjar: {
		id: '6',
		name: { first: 'Isack', last: 'Hadjar', display: 'last' },
		team: teams['racing_bulls']
	},
	carlos_sainz: {
		id: '55',
		name: { first: 'Carlos', last: 'Sainz', display: 'last' },
		team: teams['williams']
	},
	alexander_albon: {
		id: '23',
		name: { first: 'Alexander', last: 'Albon', display: 'last' },
		team: teams['williams']
	},
	nico_hulkenberg: {
		id: '27',
		name: { first: 'Nico', last: 'Hulkenberg', display: 'last' },
		team: teams['kick']
	},
	gabriel_bortoleto: {
		id: '5',
		name: { first: 'Gabriel', last: 'Bortoleto', display: 'last' },
		team: teams['kick']
	}
} as const satisfies Record<string, Driver>;
