import { subField } from '../../../data/fields.js';

export const load = async ({ params, data }) => {
	const field = params.name
		.split('/')
		.filter((field) => field != '')
		.slice(-1)[0];

	const tags = subField?.[field]?.items || [];

	return {
		tags,
		resource: data.resource
	};
};
