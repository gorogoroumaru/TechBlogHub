import { getResources } from '../../repository/resource.server';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const tag = url.searchParams.get('tag') ?? '';
	const page = parseInt(url.searchParams.get('page') ?? '0');
	const result = await getResources(tag, page);
	return json({ rows: result.rows });
}
