import type { Driver, Team } from '../types';

import alpine_logo from '$lib/assets/alpine-logo.png';
import aston_martin_logo from '$lib/assets/aston-martin-logo.png';
import audi_logo from '$lib/assets/audi-logo.png';
import cadillac_logo from '$lib/assets/cadillac-logo.png';
import ferrari_logo from '$lib/assets/ferrari-logo.png';
import haas_logo from '$lib/assets/haas-logo.png';
import mclaren_logo from '$lib/assets/mclaren-logo.png';
import mercedes_logo from '$lib/assets/mercedes-logo.png';
import rb_logo from '$lib/assets/racing-bulls-logo.png';
import red_bull_racing_logo from '$lib/assets/red-bull-racing-logo.png';
import williams_logo from '$lib/assets/williams-logo-2026.png';

export const teams = {
	red_bull_racing: {
		name: 'Red Bull Racing',
		color: '#4781D7',
		logo: red_bull_racing_logo
	},
	mercedes: {
		name: 'Mercedes',
		color: '#00D7B6',
		logo: mercedes_logo
	},
	ferrari: {
		name: 'Ferrari',
		color: '#ED1131',
		logo: ferrari_logo
	},
	aston_martin: {
		name: 'Aston Martin',
		color: '#229971',
		logo: aston_martin_logo
	},
	mclaren: {
		name: 'McLaren',
		color: '#F47600',
		logo: mclaren_logo
	},
	alpine: {
		name: 'Alpine',
		color: '#00A1E8',
		logo: alpine_logo
	},
	williams: {
		name: 'Williams',
		color: '#1868DB',
		logo: williams_logo
	},
	haas: {
		name: 'Haas F1 Team',
		color: '#9C9FA2',
		logo: haas_logo
	},
	racing_bulls: {
		name: 'Racing Bulls',
		color: '#6C98FF',
		logo: rb_logo
	},
	audi: {
		name: 'Audi',
		color: '#F50537',
		logo: audi_logo
	},
	cadillac: {
		name: 'Cadillac',
		color: '#909090',
		logo: cadillac_logo
	}
} as const satisfies Record<string, Team>;

export const drivers = {
	lando_norris: {
		number: 1,
		name: { first: 'Lando', last: 'Norris', display: 'last' },
		team: teams['mclaren']
	},
	oscar_piastri: {
		number: 81,
		name: { first: 'Oscar', last: 'Piastri', display: 'last' },
		team: teams['mclaren']
	},
	george_russell: {
		number: 63,
		name: { first: 'George', last: 'Russell', display: 'last' },
		team: teams['mercedes']
	},
	kimi_antonelli: {
		number: 12,
		name: { first: 'Kimi', last: 'Antonelli', display: 'last' },
		team: teams['mercedes']
	},
	max_verstappen: {
		number: 3,
		name: { first: 'Max', last: 'Verstappen', display: 'last' },
		team: teams['red_bull_racing']
	},
	isack_hadjar: {
		number: 6,
		name: { first: 'Isack', last: 'Hadjar', display: 'last' },
		team: teams['red_bull_racing']
	},
	charles_leclerc: {
		number: 16,
		name: { first: 'Charles', last: 'Leclerc', display: 'last' },
		team: teams['ferrari']
	},
	lewis_hamilton: {
		number: 44,
		name: { first: 'Lewis', last: 'Hamilton', display: 'last' },
		team: teams['ferrari']
	},
	alexander_albon: {
		number: 23,
		name: { first: 'Alexander', last: 'Albon', display: 'last' },
		team: teams['williams']
	},
	carlos_sainz: {
		number: 55,
		name: { first: 'Carlos', last: 'Sainz', display: 'last' },
		team: teams['williams']
	},
	liam_lawson: {
		number: 30,
		name: { first: 'Liam', last: 'Lawson', display: 'last' },
		team: teams['racing_bulls']
	},
	arvid_lindblad: {
		number: 41,
		name: { first: 'Arvid', last: 'Lindblad', display: 'last' },
		team: teams['racing_bulls']
	},
	lance_stroll: {
		number: 18,
		name: { first: 'Lance', last: 'Stroll', display: 'last' },
		team: teams['aston_martin']
	},
	fernando_alonso: {
		number: 14,
		name: { first: 'Fernando', last: 'Alonso', display: 'last' },
		team: teams['aston_martin']
	},
	esteban_ocon: {
		number: 31,
		name: { first: 'Esteban', last: 'Ocon', display: 'last' },
		team: teams['haas']
	},
	oliver_bearman: {
		number: 87,
		name: { first: 'Oliver', last: 'Bearman', display: 'last' },
		team: teams['haas']
	},
	nico_hulkenberg: {
		number: 27,
		name: { first: 'Nico', last: 'Hulkenberg', display: 'last' },
		team: teams['audi']
	},
	gabriel_bortoleto: {
		number: 5,
		name: { first: 'Gabriel', last: 'Bortoleto', display: 'last' },
		team: teams['audi']
	},
	pierre_gasly: {
		number: 10,
		name: { first: 'Pierre', last: 'Gasly', display: 'last' },
		team: teams['alpine']
	},
	franco_colapinto: {
		number: 43,
		name: { first: 'Franco', last: 'Colapinto', display: 'last' },
		team: teams['alpine']
	},
	sergio_perez: {
		number: 11,
		name: { first: 'Sergio', last: 'Perez', display: 'last' },
		team: teams['cadillac']
	},
	valtteri_bottas: {
		number: 77,
		name: { first: 'Valtteri', last: 'Bottas', display: 'last' },
		team: teams['cadillac']
	}
} as const satisfies Record<string, Driver>;
