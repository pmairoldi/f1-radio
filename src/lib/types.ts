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

export type Message = { type: 'driver' | 'team'; text: string };

export type Post = {
	title: string;
	slug: string;
	description: string;
	date: string;
	categories: string[];
	published: boolean;
};
