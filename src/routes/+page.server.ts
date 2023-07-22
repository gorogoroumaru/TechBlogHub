import {
	getResources,
	getNumberOfResources,
	getResourceByUser,
	getUserBookmarks
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

	// TODO userでフィルタした時のカウントも取得
	const count = await getNumberOfResources();

	return {
		resourceByTheUser,
		resource,
		bookmarks,
		count
	};
}
