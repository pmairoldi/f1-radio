import alfa_romeo_logo from '$lib/assets/alfa-romeo-logo.png';
import alphatauri_logo from '$lib/assets/alphatauri-logo.png';
import alpine_logo from '$lib/assets/alpine-logo.png';
import aston_martin_logo from '$lib/assets/aston-martin-logo.png';
import ferrari_logo from '$lib/assets/ferrari-logo.png';
import haas_f1_team_logo from '$lib/assets/haas-f1-team-logo.png';
import mclaren_logo from '$lib/assets/mclaren-logo.png';
import mercedes_logo from '$lib/assets/mercedes-logo.png';
import red_bull_racing_logo from '$lib/assets/red-bull-racing-logo.png';
import williams_logo from '$lib/assets/williams-logo.png';

const teamNames = [
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

export type Team = {
	name: string;
	color: string;
	logo: string;
};

const teams: Record<(typeof teamNames)[number], Team> = {
	'Red Bull Racing': {
		name: 'Red Bull Racing',
		color: '#3671C6',
		logo: red_bull_racing_logo
	},
	Mercedes: { name: 'Mercedes', color: '#6CD3BF', logo: mercedes_logo },
	Ferrari: { name: 'Ferrari', color: '#F91536', logo: ferrari_logo },
	'Aston Martin': { name: 'Aston Martin', color: '#358C75', logo: aston_martin_logo },
	McLaren: { name: 'McLaren', color: '#F58020', logo: mclaren_logo },
	Alpine: { name: 'Alpine', color: '#2293D1', logo: alpine_logo },
	Williams: { name: 'Williams', color: '#37BEDD', logo: williams_logo },
	'Haas F1 Team': { name: 'Haas F1 Team', color: '#B6BABD', logo: haas_f1_team_logo },
	'Alfa Romeo': { name: 'Alfa Romeo', color: '#C92D4B', logo: alfa_romeo_logo },
	AlphaTauri: { name: 'AlphaTauri', color: '#5E8FAA', logo: alphatauri_logo }
};

export type Name = { first: string; last: string; display: 'first' | 'last' };

export type Driver = {
	name: Name;
	team: Team;
};

export const drivers: Driver[] = [
	{ name: { first: 'Max', last: 'Verstappen', display: 'last' }, team: teams['Red Bull Racing'] },
	{ name: { first: 'Sergio', last: 'Perez', display: 'last' }, team: teams['Red Bull Racing'] },
	{ name: { first: 'Lewis', last: 'Hamilton', display: 'last' }, team: teams['Mercedes'] },
	{ name: { first: 'Fernando', last: 'Alonso', display: 'last' }, team: teams['Aston Martin'] },
	{ name: { first: 'Carlos', last: 'Sainz', display: 'last' }, team: teams['Ferrari'] },
	{ name: { first: 'Charles', last: 'Leclerc', display: 'last' }, team: teams['Ferrari'] },
	{ name: { first: 'Lando', last: 'Norris', display: 'last' }, team: teams['McLaren'] },
	{ name: { first: 'George', last: 'Russell', display: 'last' }, team: teams['Mercedes'] },
	{ name: { first: 'Oscar', last: 'Piastri', display: 'last' }, team: teams['McLaren'] },
	{ name: { first: 'Lance', last: 'Stroll', display: 'last' }, team: teams['Aston Martin'] },
	{ name: { first: 'Pierre', last: 'Gasly', display: 'last' }, team: teams['Alpine'] },
	{ name: { first: 'Esteban', last: 'Ocon', display: 'last' }, team: teams['Alpine'] },
	{ name: { first: 'Alexander', last: 'Albon', display: 'last' }, team: teams['Williams'] },
	{ name: { first: 'Nico', last: 'Hulkenberg', display: 'last' }, team: teams['Haas F1 Team'] },
	{ name: { first: 'Valtteri', last: 'Bottas', display: 'last' }, team: teams['Alfa Romeo'] },
	{ name: { first: 'Zhou', last: 'Guanyu', display: 'first' }, team: teams['Alfa Romeo'] },
	{ name: { first: 'Yuki', last: 'Tsunoda', display: 'last' }, team: teams['AlphaTauri'] },
	{ name: { first: 'Kevin', last: 'Magnussen', display: 'last' }, team: teams['Haas F1 Team'] },
	{ name: { first: 'Liam', last: 'Lawson', display: 'last' }, team: teams['AlphaTauri'] },
	{ name: { first: 'Logan', last: 'Sargeant', display: 'last' }, team: teams['Williams'] },
	{ name: { first: 'Nyck', last: 'De Vries', display: 'last' }, team: teams['AlphaTauri'] },
	{ name: { first: 'Daniel', last: 'Ricciardo', display: 'last' }, team: teams['AlphaTauri'] }
];

export type Message = { type: 'driver' | 'team'; message: string };
export type Messages = Message[];
