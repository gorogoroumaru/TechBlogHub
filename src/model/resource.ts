import { z } from 'zod';

interface ResourceParams {
	id: string;
	title: string;
	description: string;
	url: string;
	user_id: string;
	lang: string;
}

const resourceSchema = z.object({
	id: z.string().ulid(),
	title: z
		.string()
		.max(250, { message: 'タイトルが長すぎます' })
		.min(1, { message: 'タイトルを入力して下さい' }),
	description: z
		.string()
		.max(2000, { message: '入力が長すぎます' })
		.min(1, { message: 'descriptionを入力して下さい' }),
	url: z.string().url({ message: '正しいURLを入力して下さい' }),
	user_id: z.string().uuid(),
	lang: z.string().max(10).min(1, { message: '言語を入力して下さい' })
});

export class Resource {
	id: string;
	title: string;
	description: string;
	url: string;
	user_id: string;
	created_at: string;
	updated_at: string;
	lang: string;
	success: boolean;
	errors: string[];

	// TODO 使用可能な文字種を制限する
	// TODO validationエラーの際にエラーメッセージを表示
	// https://www.okupter.com/blog/sveltekit-form-validation-with-zod

	constructor(params: ResourceParams) {
		const validationStatus = resourceSchema.safeParse(params);

		this.success = validationStatus.success;
		this.errors = [];
		if ('error' in validationStatus) {
			console.log(validationStatus.error);
			this.errors = validationStatus.error.issues.map((issue) => issue.message);
		}

		this.id = params.id;
		this.title = params.title;
		this.description = params.description;
		this.url = params.url;
		this.user_id = params.user_id;
		this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
		this.updated_at = this.created_at;
		this.lang = params.lang;
	}
}
