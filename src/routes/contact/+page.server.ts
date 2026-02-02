import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const file = resolve('content/pages/contact.json');
	const data = JSON.parse(readFileSync(file, 'utf-8'));
	return { content: data };
};
