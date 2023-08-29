import * as htmlparser2 from 'htmlparser2';

export async function analyzeOGP(url: string) {
	try {
		let title = '';
		let description = '';
		let imageURL = '';
		const response = await fetch(url);
		const html = await response.text();

		const parser = new htmlparser2.Parser(
			{
				onopentag(name, attributes) {
					if (name === 'meta' && attributes.property === 'og:title') {
						title = attributes.content;
					}
					if (name === 'meta' && attributes.property === 'og:description') {
						description = attributes.content;
					}
					if (name === 'meta' && attributes.property === 'og:image') {
						imageURL = attributes.content;
					}
				}
			},
			{ decodeEntities: true }
		);

		parser.write(html);
		parser.end();

		return { title, description, imageURL };
	} catch (error) {
		console.error('Error:', error);
		return { title: '', description: '', imageURL: '' };
	}
}
