import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code');

	if (!code) {
		return new Response('Missing code parameter', { status: 400 });
	}

	const clientId = env.GITHUB_CLIENT_ID;
	const clientSecret = env.GITHUB_CLIENT_SECRET;

	// Debug: check if env vars are loaded
	if (!clientId || !clientSecret) {
		return new Response(
			`OAuth configuration error: GITHUB_CLIENT_ID is ${clientId ? 'set' : 'MISSING'}, GITHUB_CLIENT_SECRET is ${clientSecret ? 'set' : 'MISSING'}. Add these environment variables in Vercel project settings.`,
			{ status: 500 }
		);
	}

	const response = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			client_id: clientId,
			client_secret: clientSecret,
			code
		})
	});

	const data = await response.json();

	if (data.error) {
		return new Response(
			`OAuth error: ${data.error_description || data.error}. Verify your GitHub OAuth App client_id and client_secret match what is set in Vercel env vars.`,
			{ status: 400 }
		);
	}

	const token = data.access_token;

	const body = `<!DOCTYPE html>
<html>
<body>
<script>
(function() {
  function receiveMessage(e) {
    console.log("receiveMessage %o", e);
    window.opener.postMessage(
      'authorization:github:success:{"token":"${token}","provider":"github"}',
      e.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/html' }
	});
};
