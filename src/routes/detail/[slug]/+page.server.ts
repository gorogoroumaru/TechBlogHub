import { getResourceById } from '../../../repository/resource.server';
import { checkIfUserHasBookmarked, registerBookmark } from '../../../repository/bookmark.server';
import { error } from '@sveltejs/kit';

export async function load({ params, locals: { getSession } }) {
	const resource_id = params.slug;
	const resource = await getResourceById(resource_id);

	const session = await getSession();
	const user_id = session.user.id;
	const alreadyBookmarked = await checkIfUserHasBookmarked(user_id, resource_id);

	return {
		...resource.rows[0],
		alreadyBookmarked
	};
}

export const actions = {
	default: async ({ request, locals: { getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw error(401, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		const user_id = session.user.id;
		const resource_id = data.get('resource_id') as string;

		await registerBookmark(user_id, resource_id);
	}
};
