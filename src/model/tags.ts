import { z } from 'zod';

interface TagsParams {
	resource_id: string;
	tags: string[];
}

const tagsSchema = z.object({
	resource_id: z.string().ulid(),
	tags: z.array(z.string().max(50)).min(1)
});

export class Tags {
	resource_id: string;
	tags: string[];

	constructor(params: TagsParams) {
		const validationStatus = tagsSchema.safeParse(params);
		if (!validationStatus.success) {
			throw new Error('validation error in Tags', validationStatus.error);
		}
		this.resource_id = params.resource_id;
		this.tags = params.tags;
	}
}
