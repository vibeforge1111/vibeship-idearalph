import type { PageServerLoad } from './$types';
import data from '../../../content/pages/players.json';

export const load: PageServerLoad = async () => {
	return { content: data };
};
