import { connect } from '@planetscale/database';
import dotenv from 'dotenv';

dotenv.config();

const config = {
	host: process.env.DATABASE_HOST,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD
};

const conn = connect(config);

export async function getResources(tag: string) {
	let result;
	if (tag.length === 0) {
		result = await conn.execute(
			'select id, title, description,url, user_id, created_at, updated_at from Resources',
			[1]
		);
	} else {
		result = await conn.execute(
			`select id, title, description,url, user_id, created_at, updated_at from Resources where tag = ${tag}`
		);
	}

	return result;
}
