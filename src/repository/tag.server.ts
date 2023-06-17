import { connect } from '@planetscale/database';
import dotenv from 'dotenv';
import { ulid } from 'ulid';
import type { Tags } from '../model/tags';

dotenv.config();

const config = {
	host: process.env.DATABASE_HOST,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD
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
