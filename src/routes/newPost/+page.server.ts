import { getResources, getNumberOfResources } from '../../repository/resource.server';
import type { PageServerLoad } from './$types';
import type { Resource } from '../../types/resource';

export const load = (async ({ url }) => {
	const param = url.searchParams.get('page') ?? '0';
	const page = Number(param);

	const resource = (await getResources(page)) as Resource[];

	const count = await getNumberOfResources();
	return {
		resource,
		count
	};
}) satisfies PageServerLoad;
