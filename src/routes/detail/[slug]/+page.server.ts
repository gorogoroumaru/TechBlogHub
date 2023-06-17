import { getResourceById } from '../../../repository/resource.server';

export async function load({ params }) {
	// TODO idから記事を取得
	const id = params.slug;
	const resource = await getResourceById(id);
	console.log(resource.rows[0]);
	return {
		...resource.rows[0]
	};
}
