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

export async function getMemo(user_id: string, resource_id: string) {
	try {
		const result = await conn.execute(
			'select content, created_at from Memos where user_id = ? and resource_id = ?',
			[user_id, resource_id]
		);
		return result.rows.map((row) => ({ content: row?.content, created_at: row?.created_at }));
	} catch (e) {
		return [];
	}
}
