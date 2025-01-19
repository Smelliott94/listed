import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
	const access_token = cookies.get('access_token');
	if (!access_token) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	const url = 'https://api.spotify.com/v1/me';

	const response = await fetch(url, {
		headers: { Authorization: `Bearer ${access_token}` }
	});

	if (response.ok) {
		return json({ loggedin: true });
	}
	return json({ loggedin: false });
}
