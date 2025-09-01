export type Team = {
	name: string;
	color: string;
	logo: string;
};

export type NameDisplay = 'first' | 'last';

export type Name = { first: string; last: string; display: NameDisplay };

export type Driver = {
	number: number;
	name: Name;
	team: Team;
};

export type Message = { type: 'driver' | 'team'; text: string };
