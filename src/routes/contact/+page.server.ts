import type { PageServerLoad } from './$types';
import data from '../../../content/pages/contact.json';

export const load: PageServerLoad = async () => {
	return { content: data };
};
