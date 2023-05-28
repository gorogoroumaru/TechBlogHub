import { registerResource } from '../../repository/resource.server';
import { registerTags } from '../../repository/tag.server';
import { Resource } from '../../model/resource';
import { Tags } from '../../model/tags';
import { json } from '@sveltejs/kit';
import { ulid } from 'ulid';

export async function POST({ request }) {
	const { title, description, url, user_id, tags: tagList } = await request.json();
	const id = ulid();
	const resource = new Resource({ id, title, description, url, user_id });
	const tags = new Tags({ resource_id: id, tags: tagList });
	// TODO google auth libraryでvarifyIdTokenする
	// https://github.com/googleapis/google-auth-library-nodejs/blob/main/samples/verifyGoogleIdToken.js
	const result = await registerResource(resource);
	await registerTags(tags);
	return json(result);
}
