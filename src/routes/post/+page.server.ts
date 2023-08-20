import { registerResource } from '../../repository/resource.server';
import { registerTags } from '../../repository/tag.server';
import { fail, error, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { getOGPImage } from '../../utils/getOGPImage';

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
	default: async ({ request, locals: { getSession, supabase } }) => {
		const session = await getSession();
		if (!session) {
			throw error(401, { message: 'Unauthorized' });
		}

		const {
			data: { user }
		} = await supabase.auth.getUser();
		if (!user) {
			throw error(401, { message: 'Cannot get user info' });
		}
		const metadata = user.user_metadata;
		const user_name = metadata.user_name;

		const form = await superValidate(request, schema);
		if (!form.valid) {
			return fail(400, { form });
		}

		const title = form.data.title as string;
		const description = form.data.description as string;
		const url = form.data.url as string;
		const user_id = form.data.user_id as string;
		const tagList = form.data.tags as string[];

		const resource = { title, description, url, user_id, user_name };

		const result = await registerResource(resource);
		const id = Number(result);
		if (id === -1) return fail(400, { message: 'リソースの投稿に失敗しました' });

		const imageBlob = await getOGPImage(url);
		const { error } = await supabase.storage.from('ogps').upload(JSON.stringify(id), imageBlob);

		const tags = { tags: tagList, resource_id: id };
		await registerTags(tags);

		throw redirect(303, '/');
	}
};

export const load = async () => {
	const form = await superValidate(schema);

	return { form };
};
