import * as htmlparser2 from 'htmlparser2';

export async function getOGPImage(url: string) {
	try {
		let imageUrl = '';
		const response = await fetch(url);
		const html = await response.text();

		const parser = new htmlparser2.Parser(
			{
				onopentag(name, attributes) {
					if (name === 'meta' && attributes.property === 'og:image') {
						imageUrl = attributes.content;
					}
				}
			},
			{ decodeEntities: true }
		);

		parser.write(html);
		parser.end();

		const imageRes = await fetch(imageUrl);
		const imageBlob = await imageRes.blob();

		return imageBlob;
	} catch (error) {
		console.error('Error:', error);
		return '';
	}
}
