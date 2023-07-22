import { getResourceByKeyword, getResourceByTag } from '../../repository/resource.server';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const tag = (formData.get('tag') as string) ?? '';
		const keyword = (formData.get('keyword') as string) ?? '';
		const page = 0;

		let result;
		if (keyword.length > 0) {
			result = await getResourceByKeyword(keyword, page);
		} else if (tag.length > 0) {
			result = await getResourceByTag(tag, page);
		}

		return {
			resource: result
		};
	}
};
