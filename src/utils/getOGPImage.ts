import * as htmlparser2 from 'htmlparser2';

export async function getOGPImage(url: string) {
	try {
		let image_url;
		const response = await fetch(url);
		const html = await response.text();

		const parser = new htmlparser2.Parser(
			{
				onopentag(name, attributes) {
					if (name === 'meta' && attributes.property === 'og:image') {
						image_url = attributes.content;
					}
				}
			},
			{ decodeEntities: true }
		);

		parser.write(html);
		parser.end();

		return image_url;
	} catch (error) {
		console.error('Error:', error);
		return '';
	}
}
