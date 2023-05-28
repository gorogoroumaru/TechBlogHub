import { z } from 'zod';

interface ResourceParams {
	id: string;
	title: string;
	description: string;
	url: string;
	user_id: string;
}

const resourceSchema = z.object({
	id: z.string().ulid(),
	title: z.string().max(250).min(1),
	description: z.string().max(2000).min(1),
	url: z.string().url(),
	user_id: z.string().uuid()
});

export class Resource {
	id: string;
	title: string;
	description: string;
	url: string;
	user_id: string;
	created_at: string;
	updated_at: string;

	// TODO 使用可能な文字種を制限する

	constructor(params: ResourceParams) {
		const validationStatus = resourceSchema.safeParse(params);
		if (!validationStatus.success) {
			throw new Error('validation error in submission' + validationStatus.error);
		}
		this.id = params.id;
		this.title = params.title;
		this.description = params.description;
		this.url = params.url;
		this.user_id = params.user_id;
		this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
		this.updated_at = this.created_at;
	}
}
