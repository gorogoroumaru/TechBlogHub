import { conn } from './dbconnect.server';
import type { Tags } from '../types/tags';

export async function registerTags(tags: Tags) {
	for (const tag of tags.tags) {
		await conn.execute('insert into Tags (resource_id, tag_name) values (?, ?)', [
			tags.resource_id,
			tag
		]);
	}
}
