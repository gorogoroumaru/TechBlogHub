import { getUserBookmarks, getNumberOfBookmarks } from '../../repository/resource.server';
import type { PageServerLoad } from './$types';
import type { Resource } from '../../types/resource';

export const load = (async ({ url, locals: { getSession } }) => {
	const session = await getSession();
	const user_id = session?.user?.id || '';

	const param = url.searchParams.get('page') ?? '0';
	const page = Number(param);

	let bookmarks;
	if (user_id.length > 0) {
		bookmarks = (await getUserBookmarks(user_id, page)) as Resource[];
	}

	const bookmarkCount = await getNumberOfBookmarks(user_id);

	return {
		bookmarks,
		bookmarkCount
	};
}) satisfies PageServerLoad;
