import f1Bold from '$lib/fonts/Formula1-Display-Bold.woff';
import f1Regular from '$lib/fonts/Formula1-Display-Regular.woff';
import RadioBox from '$lib/renderers/RadioBox.svelte';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { html as toReactNode } from 'satori-html';
import type { ComponentProps, SvelteComponent } from 'svelte';
import type { RequestHandler } from './$types';
import { drivers, type Messages } from '$lib/data';
import { error } from '@sveltejs/kit';

type RenderResults = { html: string; css: { code: string; map: string | null }; head: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<TComponent extends SvelteComponent> = new (...args: any[]) => TComponent;

function render<TComponent extends SvelteComponent>(
	component: Constructor<TComponent>,
	props: ComponentProps<TComponent>
): RenderResults {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { render } = component as any;
	return render(props);
}

export const GET: RequestHandler = async (event) => {
	const query = event.url.searchParams;
	const d = query.get('d');
	const m = query.get('m');

	if (d == null || m == null) {
		throw error(400, `Invalid query parameters.`);
	}

	const driver = drivers.find(
		(driver) => d === `${driver.name.first}_${driver.name.last}`.toLowerCase()
	);

	if (driver == null) {
		throw error(404, `Driver not found!`);
	}

	const messages: Messages = JSON.parse(m);

	const result = render(RadioBox, { driver: driver, messages: messages });
	const element = toReactNode(`${result.html}<style>${result.css.code}</style>`);
	const svg = await satori(element, {
		width: 320,
		fonts: [
			{
				name: 'Formula1',
				data: Buffer.from(f1Regular),
				weight: 400,
				style: 'normal'
			},
			{
				name: 'Formula1',
				data: Buffer.from(f1Bold),
				weight: 700,
				style: 'normal'
			}
		],
		debug: true
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: 320 * 3
		}
	});

	const image = resvg.render();
	const png = image.asPng();

	return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
