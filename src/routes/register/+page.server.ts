import { registerResource } from '../../repository/resource.server';
import { registerTags } from '../../repository/tag.server';
import { fail, error } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const schema = z.object({
	title: z
		.string()
		.max(250, { message: 'タイトルが長すぎます' })
		.min(1, { message: 'タイトルを入力して下さい' }),
	description: z
		.string()
		.max(2000, { message: '入力が長すぎます' })
		.min(1, { message: 'descriptionを入力して下さい' }),
	url: z.string().url({ message: '正しい形式のURLを入力して下さい' }),
	user_id: z.string().uuid(),
	tags: z.array(z.string().max(100, { message: 'タグが長すぎます' }))
});

export const actions = {
	default: async ({ request, locals: { getSession } }) => {
		const session = await getSession();
		if (!session) {
			throw error(401, { message: 'Unauthorized' });
		}

		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		}

		const title = form.data.title as string;
		const description = form.data.description as string;
		const url = form.data.url as string;
		const user_id = form.data.user_id as string;
		const tagList = form.data.tags as string[];

		const resource = { title, description, url, user_id };

		const result = await registerResource(resource);
		const id = Number(result);
		if (id === -1) return fail(400);

		const tags = { tags: tagList, resource_id: id };
		await registerTags(tags);

		return { form };
	}
};

export const load = async () => {
	const form = await superValidate(schema);

	return { form };
};
