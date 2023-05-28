import { connect } from '@planetscale/database';
import dotenv from 'dotenv';
import type { Resource } from '../model/resource';
import htmlparser from 'htmlparser2';

dotenv.config();

const config = {
	host: process.env.DATABASE_HOST,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD
};

const conn = connect(config);

export async function getResources(tag: string) {
	let result;
	if (tag.length === 0) {
		result = await conn.execute(
			'select id, title, description, url, image_url, user_id, created_at, updated_at from Resources',
			[1]
		);
	} else {
		result = await conn.execute(
			'select rs.id, title, description, url, image_url, user_id, created_at, updated_at, t.tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id where t.tag_name = ?',
			[tag]
		);
	}

	return result;
}

export async function registerResource(resource: Resource) {
	try {
		const image_url = await getOGPImage(resource.url);
		await conn.execute(
			'insert into Resources (id, title, description, url, image_url, user_id, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?)',
			[
				resource.id,
				resource.title,
				resource.description,
				resource.url,
				image_url,
				resource.user_id,
				resource.created_at,
				resource.updated_at
			]
		);
		console.log('success');
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
}

async function getOGPImage(url: string) {
	try {
		let image_url;
		const response = await fetch(url);
		const html = await response.text();

		const parser = new htmlparser.Parser(
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
