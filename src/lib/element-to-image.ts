import { snapdom } from '@zumer/snapdom';

export async function getImage(output: HTMLElement): Promise<Blob> {
	return snapdom.toBlob(output, {
		type: 'png',
		scale: 3,
		dpr: 1,
		embedFonts: true
	});
}
