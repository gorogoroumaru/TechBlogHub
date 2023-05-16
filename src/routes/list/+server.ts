import { getResources } from '../../repository/resource.server';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const tag = url.searchParams.get('tag') ?? '';
	const result = await getResources(tag);
	return json({ rows: result.rows });
}
