import type { PageServerLoad } from './$types';
import data from '../../../content/pages/courses.json';

export const load: PageServerLoad = async () => {
	return { content: data };
};
