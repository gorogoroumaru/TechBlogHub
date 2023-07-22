import { conn } from './dbconnect.server';
import type { Resource } from '../model/resource';
import * as htmlparser2 from 'htmlparser2';

export async function getResources(page: number) {
	const result = await conn.execute(
		'select rs.id, title, description, url, image_url, user_id, created_at, updated_at, t.tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id limit 10 offset ?',
		[page * 10]
	);

	return result?.rows;
}

export async function getResourceByTag(tag: string, page: number) {
	const result = await conn.execute(
		'select rs.id, title, description, url, image_url, user_id, created_at, updated_at, t.tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id where t.tag_name = ? limit 10 offset ?',
		[tag, page * 10]
	);

	return result?.rows;
}

export async function getResourceByKeyword(keyword: string, page: number) {
	const result = await conn.execute(
		'select rs.id, title, description, url, image_url, user_id, created_at, updated_at, t.tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id where match(`title`, `description`) against(?) limit 10 offset ?',
		[keyword, page * 10]
	);
	return result?.rows;
}

export async function getResourceById(id: string) {
	const result = await conn.execute(
		'select rs.id, title, description, url, image_url, user_id, created_at, updated_at, t.tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id where rs.id = ?',
		[id]
	);
	return result?.rows?.[0];
}

export async function getResourceByUser(user_id: string, page: number) {
	const result = await conn.execute(
		'select rs.id, title, description, url, image_url, user_id, created_at, updated_at, t.tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id where user_id = ? limit 10 offset ?',
		[user_id, page * 10]
	);
	return result.rows;
}

export async function getNumberOfResources() {
	const result = await conn.execute('select count(id) as count from Resources');
	return result?.rows?.[0]?.count;
}

// TODO 関連サイトのリンクを設定できるようにする (optional)
// vector searchで類似文書を引っ張ってくるのもありか
export async function registerResource(resource: Resource) {
	try {
		const image_url = await getOGPImage(resource.url);
		const result = await conn.execute(
			'insert into Resources (title, description, url, image_url, user_id, can_publish) values (?, ?, ?, ?, ?, ?)',
			[resource.title, resource.description, resource.url, image_url, resource.user_id, 0]
		);
		return result.insertId;
	} catch (e) {
		return -1;
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
