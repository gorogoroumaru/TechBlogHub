interface TagsParams {
	resource_id: string;
	tags: any;
}

export class Tags {
	resource_id: string;
	tags: any;

	constructor(params: TagsParams) {
		this.resource_id = params.resource_id;
		this.tags = params.tags;
	}
}
