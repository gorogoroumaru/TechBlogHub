import { conn } from './dbconnect.server';

export async function registerBookmark(user_id: string, resource_id: string) {
	try {
		const alreadyBookmarked = await checkIfUserHasBookmarked(user_id, resource_id);
		if (alreadyBookmarked) {
			return true;
		}

		await conn.execute('insert into Bookmarks (user_id, resource_id) values (?, ?)', [
			user_id,
			resource_id
		]);

		return true;
	} catch (e) {
		return false;
	}
}

export async function checkIfUserHasBookmarked(user_id: string, resource_id: string) {
	try {
		const result = await conn.execute(
			'select id from Bookmarks where user_id = ? and resource_id = ?',
			[user_id, resource_id]
		);

		if (result.size > 0) {
			return true;
		}

		return false;
	} catch (e) {
		return false;
	}
}
