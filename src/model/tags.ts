interface TagsParams {
	resource_id: string;
	tags: string;
}

export class Tags {
	resource_id: string;
	tags: string;

	constructor(params: TagsParams) {
		this.resource_id = params.resource_id;
		this.tags = params.tags;
	}
}
