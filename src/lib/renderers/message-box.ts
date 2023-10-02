import type satori from 'satori';

type Element = Parameters<typeof satori>[0];

export function messageBox(options: {
	driver: string;
	team: { name: string; color: string; logo: string };
	messages: { type: 'driver' | 'team'; message: string }[];
}): Element {
	const { driver, team, messages } = options;

	return {
		type: 'div',
		props: {
			style: {
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: 'black',
				width: '100%'
			},
			children: [
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							flexDirection: 'column',
							padding: '16px',
							gap: '4px',
							backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent)'
						},
						children: [
							{
								type: 'span',
								props: {
									style: {
										alignSelf: 'flex-end',
										textTransform: 'uppercase',
										fontSize: '30px',
										lineHeight: '36px',
										transform: 'skewX(-12deg)',
										color: team.color
									},
									children: driver
								}
							},
							{
								type: 'div',
								props: {
									style: {
										alignSelf: 'flex-end',
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center'
									},
									children: [
										// {
										// 	type: 'img',
										// 	props: { src: team.logo, width: 30, height: 30 }
										// },
										{
											type: 'span',
											props: {
												style: {
													textTransform: 'uppercase',
													fontSize: '16px',
													lineHeight: '24px',
													color: 'white'
												},
												children: team.name
											}
										}
									]
								}
							}
						]
					}
				},
				{
					type: 'div',
					props: {
						style: {
							height: '1.5px',
							background: team.color
						}
					}
				},
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							flexDirection: 'column',
							gap: '8px',
							padding: '16px',
							backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent)'
						},
						children: messages.map(({ type, message }) => {
							if (type === 'team') {
								return {
									type: 'span',
									props: {
										style: {
											alignSelf: 'flex-start',
											textAlign: 'start',
											textTransform: 'uppercase',
											fontSize: '20px',
											lineHeight: '28px',
											color: 'white',
											maxWidth: '85%',
											transform: 'skewX(-12deg)'
										},
										children: `"${message}"`
									}
								};
							} else if (type === 'driver') {
								return {
									type: 'span',
									props: {
										style: {
											alignSelf: 'flex-end',
											textAlign: 'end',
											textTransform: 'uppercase',
											fontSize: '20px',
											lineHeight: '28px',
											color: team.color,
											maxWidth: '85%',
											transform: 'skewX(-12deg)'
										},
										children: `"${message}"`
									}
								};
							} else {
								return '';
							}
						})
					}
				}
			]
		}
	};
}
