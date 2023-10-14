import type satori from 'satori';
import fs from 'fs';

type Element = Parameters<typeof satori>[0];

function toBase64(src: string): string {
	const file = fs.readFileSync(`.${src}`);
	const base64 = file.toString('base64');

	return `data:image/png;base64,${base64}`;
}

export function radioBox(options: {
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
				backgroundColor: '#16181c',
				gap: '12px',
				width: '100%'
			},
			children: [
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							flexDirection: 'column',
							backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent)',
							position: 'relative'
						},
						children: [
							{
								type: 'div',
								props: {
									style: {
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										backgroundColor: 'green'
									}
								}
							},
							{
								type: 'div',
								props: {
									style: {
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-end',
										padding: '16px',
										gap: '8px'
									},
									children: [
										{
											type: 'div',
											props: {
												style: {
													textTransform: 'uppercase',
													fontSize: '36px',
													transform: 'skewX(-12deg)',
													fontWeight: '700',
													color: team.color
												},
												children: driver
											}
										},
										{
											type: 'div',
											props: {
												style: {
													display: 'flex',
													flexDirection: 'row',
													alignItems: 'center'
												},
												children: [
													{
														type: 'img',
														props: { src: toBase64(team.logo), height: 30 }
													},
													{
														type: 'span',
														props: {
															style: {
																alignSelf: 'flex-end',
																textTransform: 'uppercase',
																fontSize: '36px',
																transform: 'skewX(-12deg)',
																fontWeight: '700',
																color: 'white'
															},
															children: 'Radio'
														}
													}
												]
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
							padding: '20px',
							backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent)'
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
											transform: 'skewX(-12deg)',
											whiteSpace: 'nowrap'
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
