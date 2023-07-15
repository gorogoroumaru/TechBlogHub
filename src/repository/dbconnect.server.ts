import { connect } from '@planetscale/database';
import {
	PRIVATE_DATABASE_HOST,
	PRIVATE_DATABASE_USERNAME,
	PRIVATE_DATABASE_PASSWORD
} from '$env/static/private';

const config = {
	host: PRIVATE_DATABASE_HOST,
	username: PRIVATE_DATABASE_USERNAME,
	password: PRIVATE_DATABASE_PASSWORD,
	fetch: (url: string, init: any) => {
		delete init['cache'];
		return fetch(url, init);
	}
};

export const conn = connect(config);
