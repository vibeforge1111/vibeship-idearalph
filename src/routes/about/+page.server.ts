import type { PageServerLoad } from './$types';
import data from '../../../content/pages/about.json';

export const load: PageServerLoad = async () => {
	return { content: data };
};
