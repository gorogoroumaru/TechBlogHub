import * as htmlparser2 from 'htmlparser2';
import Jimp from 'jimp';

function base64ToBlob(base64Img: string) {
	const bin = atob(base64Img.replace(/^.*,/, ''));
	const buffer = new Uint8Array(bin.length);
	for (let i = 0; i < bin.length; i++) {
		buffer[i] = bin.charCodeAt(i);
	}
	return new Blob([buffer.buffer], {
		type: 'image/png'
	});
}

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

		// TODO ogpがなければplaceholderを保存するのもありか
		let result;
		const originalImg = await Jimp.read({ url: imageUrl });
		originalImg.contain(400, 200).getBase64(Jimp.MIME_PNG, function (err, src) {
			result = base64ToBlob(src);
		});
		return result;
	} catch (error) {
		console.error('Error:', error);
		return '';
	}
}
