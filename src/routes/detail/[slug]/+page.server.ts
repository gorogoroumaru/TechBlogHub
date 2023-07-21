import { getResourceById } from '../../../repository/resource.server';
import { checkIfUserHasBookmarked, registerBookmark } from '../../../repository/bookmark.server';
import { registerMemo, getMemo } from '../../../repository/memo.server';
import { error } from '@sveltejs/kit';

export async function load({ params, locals: { getSession } }) {
	const resource_id = params.slug;
	const resource = await getResourceById(resource_id);
	let alreadyBookmarked = false;

	const session = await getSession();
	const user_id = session?.user?.id;
	if (user_id) {
		alreadyBookmarked = await checkIfUserHasBookmarked(user_id, resource_id);
	}

	const memos = await getMemo(user_id, resource_id);

	return {
		...resource,
		alreadyBookmarked,
		memos
	};
}

export const actions = {
	saveBookmark: async ({ request, locals: { getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw error(401, { message: 'Unauthorized' });
		}

		const data = await request.formData();
		const user_id = session.user.id;
		const resource_id = data.get('resource_id') as string;

		await registerBookmark(user_id, resource_id);
	},
	submitMemo: async ({ request, locals: { getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw error(401, { message: 'Unauthorized' });
		}

		const user_id = session.user.id;

		const data = await request.formData();
		const resource_id_string = data.get('resource_id') as string;
		const resource_id = Number(resource_id_string);
		const memo = data.get('memo') as string;

		await registerMemo(memo, user_id, resource_id);
	}
};
