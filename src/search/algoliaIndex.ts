import { client } from './algoliaConnect';
import type { Resource } from '../types/resource';

export async function saveResourceToIndex(resource: Resource) {
	const index = client.initIndex('techbloghub_resource_index');
	const record = [
		{
			objectID: resource.id,
			title: resource.title,
			content: resource.description
		}
	];

	await index.saveObjects(record);
}

export async function searchIndex(query: string) {
	const index = client.initIndex('techbloghub_resource_index');
	const searchResult = await index.search(query);
	return searchResult;
}
