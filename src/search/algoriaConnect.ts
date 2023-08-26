import algoliasearch from 'algoliasearch';
import { PRIVATE_ALGOLIA_APPLICATION_ID, PRIVATE_ALGOLIA_ADMIN_API_KEY } from '$env/static/private';

export const client = algoliasearch(PRIVATE_ALGOLIA_APPLICATION_ID, PRIVATE_ALGOLIA_ADMIN_API_KEY);
