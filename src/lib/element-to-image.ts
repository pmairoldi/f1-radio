import domtoimage from 'dom-to-image';

export async function getImage(output: HTMLElement): Promise<Blob> {
	const scale = 3;
	const width = output.offsetWidth;
	const height = output.offsetHeight;

	return domtoimage.toBlob(output, {
		width: width * scale,
		height: height * scale,
		style: {
			transform: `scale(${scale})`,
			transformOrigin: 'top left',
			width: `${width}px`,
			height: `${height}px`
		}
	});
}
