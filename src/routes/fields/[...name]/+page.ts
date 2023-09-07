export const load = async ({ fetch, params, data }) => {
	let tags: string[] = [];
	const field = params.name
		.split('/')
		.filter((field) => field != '')
		.slice(-1)[0];

	try {
		const res = await fetch(`/json/${field}.tags.json`);
		tags = await res.json();
	} catch (err) {
		console.log(`json not found for tag ${field}`);
	}

	return {
		tags,
		resource: data.resource
	};
};
