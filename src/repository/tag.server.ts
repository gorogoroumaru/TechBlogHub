import { connect } from '@planetscale/database';
import {
	PRIVATE_DATABASE_HOST,
	PRIVATE_DATABASE_USERNAME,
	PRIVATE_DATABASE_PASSWORD
} from '$env/static/private';
import { ulid } from 'ulid';
import type { Tags } from '../model/tags';

const config = {
	host: PRIVATE_DATABASE_HOST,
	username: PRIVATE_DATABASE_USERNAME,
	password: PRIVATE_DATABASE_PASSWORD,
	fetch: (url: string, init: any) => {
		delete init['cache'];
		return fetch(url, init);
	}
};

const conn = connect(config);

export async function registerTags(tags: Tags) {
	try {
		for (const tag of tags.tags) {
			const id = ulid();
			await conn.execute('insert into Tags (id, resource_id, tag_name) values (?, ?, ?)', [
				id,
				tags.resource_id,
				tag
			]);
		}
		return true;
	} catch (e) {
		return false;
	}
}
