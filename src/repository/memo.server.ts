import { conn } from './dbconnect.server';

export async function registerMemo(memo: string, user_id: string, resource_id: number) {
	try {
		await conn.execute('insert into Memos (content, user_id, resource_id) values (?, ?, ?)', [
			memo,
			user_id,
			resource_id
		]);

		return true;
	} catch (e) {
		return false;
	}
}
