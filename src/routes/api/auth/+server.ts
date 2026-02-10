import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';

export const GET: RequestHandler = async ({ url }) => {
	const clientId = env.GITHUB_CLIENT_ID;
	const scope = 'repo,user';
	const redirectUri = `${url.origin}/api/auth/callback`;

	const authUrl = new URL(GITHUB_AUTH_URL);
	authUrl.searchParams.set('client_id', clientId || '');
	authUrl.searchParams.set('redirect_uri', redirectUri);
	authUrl.searchParams.set('scope', scope);

	redirect(302, authUrl.toString());
};
