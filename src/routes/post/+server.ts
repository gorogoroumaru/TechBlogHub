import { analyzeOGP } from '../../utils/ogp';

export const GET = async ({ url }) => {
	const blogUrl = url.searchParams.get('url') as string;

	const result = await analyzeOGP(blogUrl);

	return new Response(JSON.stringify({ ...result }));
};
