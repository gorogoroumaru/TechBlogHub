import { connect } from '@planetscale/database';
import { env } from '$env/dynamic/private';
import type { Resource } from '../model/resource';
import * as htmlparser2 from 'htmlparser2';

const config = {
	host: env.DATABASE_HOST,
	username: env.DATABASE_USERNAME,
	password: env.DATABASE_PASSWORD
};

const conn = connect(config);

export async function getResources(tag: string, page: number) {
	let result;
	if (tag.length === 0) {
		result = await conn.execute(
			'select rs.id, title, description, url, image_url, user_id, created_at, updated_at, lang, t.tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id limit 10 offset ?',
			[page * 10]
		);
	} else {
		result = await conn.execute(
			'select rs.id, title, description, url, image_url, user_id, created_at, updated_at, lang, t.tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id where t.tag_name = ?',
			[tag]
		);
	}

	return result;
}

export async function getResourceById(id: string) {
	const result = await conn.execute(
		'select rs.id, title, description, url, image_url, user_id, created_at, updated_at, lang, t.tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id where rs.id = ?',
		[id]
	);
	return result;
}

// TODO 関連サイトのリンクを設定できるようにする (optional)
// vector searchで類似文書を引っ張ってくるのもありか
export async function registerResource(resource: Resource) {
	try {
		const image_url = await getOGPImage(resource.url);
		await conn.execute(
			'insert into Resources (id, title, description, url, image_url, user_id) values (?, ?, ?, ?, ?, ?)',
			[resource.id, resource.title, resource.description, resource.url, image_url, resource.user_id]
		);
		return true;
	} catch (e) {
		return false;
	}
}

async function getOGPImage(url: string) {
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
