import { getResourceByTag } from '../../../repository/resource.server';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const lastField = params.name
		.split('/')
		.filter((field) => field != '')
		.slice(-1)[0];
	const resource = await getResourceByTag(lastField, 0);

	return {
		resource
	};
}) satisfies PageServerLoad;
