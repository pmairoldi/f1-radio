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

type Team = {
	name: string;
	color: string;
};

const teams: Record<(typeof teamNames)[number], Team> = {
	'Red Bull Racing': { name: 'Red Bull Racing', color: '#3671C6' },
	Mercedes: { name: 'Mercedes', color: '#6CD3BF' },
	Ferrari: { name: 'Ferrari', color: '#F91536' },
	'Aston Martin': { name: 'Aston Martin', color: '#358C75' },
	McLaren: { name: 'McLaren', color: '#F58020' },
	Alpine: { name: 'Alpine', color: '#2293D1' },
	Williams: { name: 'Williams', color: '#37BEDD' },
	'Haas F1 Team': { name: 'Haas F1 Team', color: '#B6BABD' },
	'Alfa Romeo': { name: 'Alfa Romeo', color: '#C92D4B' },
	AlphaTauri: { name: 'AlphaTauri', color: '#5E8FAA' }
};

type Name = { first: string; last: string; display: 'first' | 'last' };

type Driver = {
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
