import alfa_romeo_logo from '$lib/assets/alfa-romeo-logo.png';
import alphatauri_logo from '$lib/assets/alphatauri-logo.png';
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
import type { Driver, Team } from './types';

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
	'AlphaTauri',
	'RB',
	'Kick'
] as const;

const teams: Record<(typeof teamNames)[number], Team> = {
	'Red Bull Racing': {
		name: 'Red Bull Racing',
		color: '#1e5bc6',
		logo: red_bull_racing_logo
	},
	Mercedes: {
		name: 'Mercedes',
		color: '#6cd3bf',
		logo: mercedes_logo
	},
	Ferrari: {
		name: 'Ferrari',
		color: '#ed1c24',
		logo: ferrari_logo
	},
	'Aston Martin': {
		name: 'Aston Martin',
		color: '#2d826d',
		logo: aston_martin_logo
	},
	McLaren: {
		name: 'McLaren',
		color: '#f58020',
		logo: mclaren_logo
	},
	Alpine: {
		name: 'Alpine',
		color: '#2293d1',
		logo: alpine_logo
	},
	Williams: {
		name: 'Williams',
		color: '#37bedd',
		logo: williams_logo
	},
	'Haas F1 Team': {
		name: 'Haas F1 Team',
		color: '#b6babd',
		logo: haas_logo
	},
	'Alfa Romeo': {
		name: 'Alfa Romeo',
		color: '#b12039',
		logo: alfa_romeo_logo
	},
	AlphaTauri: {
		name: 'AlphaTauri',
		color: '#4e7c9b',
		logo: alphatauri_logo
	},
	RB: {
		name: 'RB',
		color: '#6692FF',
		logo: rb_logo
	},
	Kick: {
		name: 'Kick',
		color: '#52e252',
		logo: kick_logo
	}
};

export const drivers: Driver[] = [
	{
		id: '1',
		name: { first: 'Max', last: 'Verstappen', display: 'last' },
		team: teams['Red Bull Racing']
	},
	{
		id: '4',
		name: { first: 'Lando', last: 'Norris', display: 'last' },
		team: teams['McLaren']
	},
	{
		id: '16',
		name: { first: 'Charles', last: 'Leclerc', display: 'last' },
		team: teams['Ferrari']
	},
	{
		id: '81',
		name: { first: 'Oscar', last: 'Piastri', display: 'last' },
		team: teams['McLaren']
	},
	{
		id: '55',
		name: { first: 'Carlos', last: 'Sainz', display: 'last' },
		team: teams['Ferrari']
	},
	{
		id: '44',
		name: { first: 'Lewis', last: 'Hamilton', display: 'last' },
		team: teams['Mercedes']
	},
	{
		id: '63',
		name: { first: 'George', last: 'Russell', display: 'last' },
		team: teams['Mercedes']
	},
	{
		id: '11',
		name: { first: 'Sergio', last: 'Perez', display: 'last' },
		team: teams['Red Bull Racing']
	},
	{
		id: '14',
		name: { first: 'Fernando', last: 'Alonso', display: 'last' },
		team: teams['Aston Martin']
	},
	{
		id: '27',
		name: { first: 'Nico', last: 'Hulkenberg', display: 'last' },
		team: teams['Haas F1 Team']
	},
	{
		id: '18',
		name: { first: 'Lance', last: 'Stroll', display: 'last' },
		team: teams['Aston Martin']
	},
	{
		id: '22',
		name: { first: 'Yuki', last: 'Tsunoda', display: 'last' },
		team: teams['RB']
	},
	{
		id: '23',
		name: { first: 'Alexander', last: 'Albon', display: 'last' },
		team: teams['Williams']
	},
	{
		id: '3',
		name: { first: 'Daniel', last: 'Ricciardo', display: 'last' },
		team: teams['RB']
	},
	{
		id: '20',
		name: { first: 'Kevin', last: 'Magnussen', display: 'last' },
		team: teams['Haas F1 Team']
	},
	{
		id: '10',
		name: { first: 'Pierre', last: 'Gasly', display: 'last' },
		team: teams['Alpine']
	},
	{
		id: '28',
		name: { first: 'Oliver', last: 'Bearman', display: 'last' },
		team: teams['Haas F1 Team']
	},
	{
		id: '31',
		name: { first: 'Esteban', last: 'Ocon', display: 'last' },
		team: teams['Alpine']
	},
	{
		id: '43',
		name: { first: 'Franco', last: 'Colapinto', display: 'last' },
		team: teams['Williams']
	},
	{
		id: '24',
		name: { first: 'Zhou', last: 'Guanyu', display: 'first' },
		team: teams['Kick']
	},
	{
		id: '2',
		name: { first: 'Logan', last: 'Sargeant', display: 'last' },
		team: teams['Williams']
	},
	{
		id: '77',
		name: { first: 'Valtteri', last: 'Bottas', display: 'last' },
		team: teams['Kick']
	},
	{
		id: '40',
		name: { first: 'Liam', last: 'Lawson', display: 'last' },
		team: teams['AlphaTauri']
	}
];
