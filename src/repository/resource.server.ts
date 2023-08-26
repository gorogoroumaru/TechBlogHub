import { conn } from './dbconnect.server';
import type { Resource } from '../types/resource';

export async function getResources(page: number) {
	const result = await conn.execute(
		'select rs.id, title, description, url, image_url, user_id, user_name, created_at, updated_at, group_concat(t.tag_name) as tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id group by rs.id limit 10 offset ?',
		[page * 10]
	);

	return result?.rows;
}

export async function getResourceByTag(tag: string, page: number) {
	const result = await conn.execute(
		'select rs.id, title, description, url, image_url, user_id, created_at, updated_at, group_concat(t.tag_name) as tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id where t.tag_name = ? group by rs.id limit 10 offset ?',
		[tag, page * 10]
	);
	const rows = result?.rows as Resource[];
	return rows;
}

export async function getResourceByKeyword(keyword: string, page: number) {
	const result = await conn.execute(
		'select rs.id, title, description, url, image_url, user_id, created_at, updated_at, group_concat(t.tag_name) as tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id where match(`title`, `description`) against(? in natural language mode) group by rs.id limit 10 offset ?',
		[keyword, page * 10]
	);
	return result?.rows;
}

export async function getResourceById(id: string) {
	const result = await conn.execute(
		'select rs.id, title, description, url, image_url, user_id, user_name, created_at, updated_at, group_concat(t.tag_name) as tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id where rs.id = ? group by rs.id',
		[id]
	);
	const row = result?.rows?.[0] as Resource;
	return row;
}

export async function getResourceByIds(ids: string[]) {
	if (ids.length === 0) {
		return [];
	}
	const placeholder = ids.map((_) => '?').join(',');
	const result = await conn.execute(
		`select rs.id, title, description, url, image_url, user_id, user_name, created_at, updated_at, group_concat(t.tag_name) as tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id where rs.id in (${placeholder}) group by rs.id`,
		[...ids]
	);
	console.log(result);
	const row = result?.rows as Resource[];
	return row;
}

export async function getResourceByUser(user_id: string, page: number) {
	const result = await conn.execute(
		'select rs.id, title, description, url, image_url, user_id, created_at, updated_at, group_concat(t.tag_name) as tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id where user_id = ? group by rs.id limit 10 offset ?',
		[user_id, page * 10]
	);
	return result.rows;
}

export async function getUserBookmarks(user_id: string, page: number) {
	const result = await conn.execute(
		'select rs.id, title, description, url, image_url, rs.created_at, group_concat(t.tag_name) as tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id INNER JOIN Bookmarks as b ON rs.id = b.resource_id where b.user_id = ? group by rs.id limit 10 offset ?',
		[user_id, page * 10]
	);
	return result.rows;
}

export async function getNumberOfResources() {
	const result = await conn.execute('select count(id) as count from Resources');
	const row = result?.rows?.[0] as { count: string };
	return row?.count;
}

export async function getNumberOfResourcesByUser(user_id: string) {
	const result = await conn.execute(
		'select count(*) as count from (select count(rs.id), group_concat(t.tag_name) as tag_name from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id where user_id = ? group by rs.id) tmp;',
		[user_id]
	);
	const row = result?.rows?.[0] as { count: string };
	return row?.count;
}

export async function getNumberOfBookmarks(user_id: string) {
	const result = await conn.execute(
		'select count(rs.id) as count from Resources as rs INNER JOIN Tags as t ON rs.id = t.resource_id INNER JOIN Bookmarks as b ON rs.id = b.resource_id where b.user_id = ?',
		[user_id]
	);
	const row = result?.rows?.[0] as { count: string };
	return row?.count;
}

export async function registerResource(resource: Resource) {
	const result = await conn.execute(
		'insert into Resources (title, description, url, user_id, user_name, can_publish) values (?, ?, ?, ?, ?, ?)',
		[resource.title, resource.description, resource.url, resource.user_id, resource.user_name, 0]
	);
	return result.insertId;
}
