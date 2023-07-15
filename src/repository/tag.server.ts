import { conn } from './dbconnect.server';
import { ulid } from 'ulid';
import type { Tags } from '../model/tags';

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
