import { json } from '@sveltejs/kit';

export async function GET({ cookies }) {
    const access_token = cookies.get('access_token');
    if (!access_token) {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: { Authorization: `Bearer ${access_token}` }
    });

    if (!response.ok) {
        return json({ error: 'Failed to fetch playlists' }, { status: response.status });
    }

    const data = await response.json();
    return json(data);
}