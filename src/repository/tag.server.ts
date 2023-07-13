import { connect } from '@planetscale/database';
import { env } from '$env/dynamic/private';
import { ulid } from 'ulid';
import type { Tags } from '../model/tags';

const config = {
	host: env.DATABASE_HOST,
	username: env.DATABASE_USERNAME,
	password: env.DATABASE_PASSWORD
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
