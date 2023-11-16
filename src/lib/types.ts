export type Team = {
	name: string;
	color: string;
	logo: string;
};

export type Name = { first: string; last: string; display: 'first' | 'last' };

export type Driver = {
	id: string;
	name: Name;
	team: Team;
};

export type Message = { type: 'driver' | 'team'; message: string };
export type Messages = Message[];
