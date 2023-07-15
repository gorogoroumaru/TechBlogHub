import { conn } from './dbconnect.server';

export async function registerBookmark(user_id: string, resource_id: string) {
	try {
		await conn.execute('insert into Bookmarks (user_id, resource_id) values (?, ?)', [
			user_id,
			resource_id
		]);

		return true;
	} catch (e) {
		return false;
	}
}
