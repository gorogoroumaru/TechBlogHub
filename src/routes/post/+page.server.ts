import { registerResource } from '../../repository/resource.server';
import { registerTags } from '../../repository/tag.server';
import { fail, error, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { saveResourceToIndex } from '../../search/algoliaIndex';
import type { Resource } from '../../types/resource';

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
	tags: z.array(z.string().max(100, { message: 'タグが長すぎます' })),
	imageURL: z.string().url().optional()
});

export const actions = {
	default: async ({ request, locals: { getSession, supabase } }) => {
		const session = await getSession();
		if (!session) {
			throw error(401, { message: 'Unauthorized' });
		}
		const user_name = session?.user?.user_metadata?.user_name;

		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		}

		const title = form.data.title as string;
		const description = form.data.description as string;
		const url = form.data.url as string;
		const user_id = form.data.user_id as string;
		const tagList = form.data.tags as string[];
		const imageURL = form.data.imageURL as string;

		try {
			const resource = { title, description, url, user_id, user_name } as Resource;
			const id = await registerResource(resource);

			await saveResourceToIndex({ ...resource, id });

			const image = await fetch(imageURL);
			const blob = await image.blob();
			await supabase.storage.from('ogps').upload(id, blob);

			const tags = { tags: tagList, resource_id: id };
			await registerTags(tags);
		} catch (err) {
			return fail(400, { form, message: 'リソースの投稿に失敗しました' });
		}

		throw redirect(303, '/');
	}
};

export const load = async () => {
	const form = await superValidate(schema);

	return { form };
};
