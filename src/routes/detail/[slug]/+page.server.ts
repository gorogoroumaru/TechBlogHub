import { getResourceById } from '../../../repository/resource.server';
import { registerBookmark } from '../../../repository/bookmark.server';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const id = params.slug;
	const resource = await getResourceById(id);
	return {
		...resource.rows[0]
	};
}

export const actions = {
	default: async ({ request, locals: { getSession } }) => {
		const data = await request.formData();
		const user_id = data.get('user_id') as string;
		const resource_id = data.get('resource_id') as string;

		// TODO DBにブックマークを登録
		console.log(user_id, resource_id);

		const session = await getSession();
		if (!session) {
			throw error(401, { message: 'Unauthorized' });
		}

		await registerBookmark(user_id, resource_id);
	}
};
