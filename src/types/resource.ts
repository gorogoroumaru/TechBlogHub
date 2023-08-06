export interface Resource {
	id: string;
	title: string;
	description: string;
	url: string;
	user_id: string;
	user_name: string;
	image_url: string;
	tag_name: string;
	created_at: string;
}

export interface ResourceParams {
	title: string;
	description: string;
	url: string;
	user_id: string;
	user_name: string;
}
