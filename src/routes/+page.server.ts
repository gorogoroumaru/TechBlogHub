import {
	getResources,
	getNumberOfResources,
	getResourceByUser,
	getUserBookmarks,
	getNumberOfBookmarks,
	getNumberOfResourcesByUser
} from '../repository/resource.server';

export async function load({ url, locals: { getSession } }) {
	const session = await getSession();
	const user_id = session?.user?.id;

	const param = url.searchParams.get('page') ?? '0';
	const page = Number(param);

	let resourceByTheUser, bookmarks;
	if (user_id.length > 0) {
		resourceByTheUser = await getResourceByUser(user_id, page);
		bookmarks = await getUserBookmarks(user_id, page);
	}

	const resource = await getResources(page);

	const count = await getNumberOfResources();
	const bookmarkCount = await getNumberOfBookmarks(user_id);
	const userResourceCount = await getNumberOfResourcesByUser(user_id);

	return {
		resourceByTheUser,
		resource,
		bookmarks,
		count,
		bookmarkCount,
		userResourceCount
	};
}
