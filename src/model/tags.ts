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
	success: boolean;
	errors: string[];

	constructor(params: TagsParams) {
		const validationStatus = tagsSchema.safeParse(params);
		this.success = validationStatus.success;
		this.errors = [];
		if ('error' in validationStatus) {
			this.errors = validationStatus.error.issues.map((issue) => issue.message);
		}

		this.resource_id = params.resource_id;
		this.tags = params.tags;
	}
}
