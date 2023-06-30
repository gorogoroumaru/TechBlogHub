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

	// TODO 使用可能な文字種を制限する
	// TODO validationエラーの際にエラーメッセージを表示
	// https://www.okupter.com/blog/sveltekit-form-validation-with-zod

	constructor(params: ResourceParams) {
		this.id = params.id;
		this.title = params.title;
		this.description = params.description;
		this.url = params.url;
		this.user_id = params.user_id;
		this.lang = params.lang;
	}
}
