import { getResourceById } from '../../../repository/resource.server';

export async function load({ params }) {
	const id = params.slug;
	const resource = await getResourceById(id);
	return {
		...resource.rows[0]
	};
}
