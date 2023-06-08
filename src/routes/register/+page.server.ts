import { registerResource } from '../../repository/resource.server';
import { registerTags } from '../../repository/tag.server';
import { Resource } from '../../model/resource';
import { Tags } from '../../model/tags';
import { ulid } from 'ulid';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title') as string;
		const description = data.get('description') as string;
		const url = data.get('url') as string;
		const user_id = data.get('user_id') as string;
		const lang = data.get('lang') as string;
		const id = ulid();

		// TODO tagが送信されないのを修正
		const tagString = data.get('tags') as string;
		const tagList = JSON.parse(tagString);

		const resource = new Resource({ id, title, description, url, user_id, lang });
		if (!resource.success)
			return fail(400, { success: false, errors: JSON.stringify(resource.errors) });
		const tags = new Tags({ resource_id: id, tags: tagList });
		// TODO google auth libraryでvarifyIdTokenする
		// https://github.com/googleapis/google-auth-library-nodejs/blob/main/samples/verifyGoogleIdToken.js
		const result = await registerResource(resource);
		await registerTags(tags);
		return { success: result };
	}
};
