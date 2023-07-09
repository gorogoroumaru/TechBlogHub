interface ResourceParams {
	id: string;
	title: string;
	description: string;
	url: string;
	user_id: string;
	lang: string;
}

export class Resource {
	id: string;
	title: string;
	description: string;
	url: string;
	user_id: string;
	lang: string;

	constructor(params: ResourceParams) {
		this.id = params.id;
		this.title = params.title;
		this.description = params.description;
		this.url = params.url;
		this.user_id = params.user_id;
		this.lang = params.lang;
	}
}
