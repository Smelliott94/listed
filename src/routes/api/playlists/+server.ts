import { json } from '@sveltejs/kit';
import type { Playlist, PlaylistResponse } from '$lib/types/spotify';

export async function GET({ cookies }) {
	const access_token = cookies.get('access_token');
	if (!access_token) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	let url: string | null = 'https://api.spotify.com/v1/me/playlists';
	const allPlaylists: Playlist[] = [];

	while (url) {
		const response = await fetch(url, {
			headers: { Authorization: `Bearer ${access_token}` }
		});

		if (!response.ok) {
			return json({ error: 'Failed to fetch playlists' }, { status: response.status });
		}

		const data: PlaylistResponse = await response.json();
		allPlaylists.push(...data.items);
		url = data.next;
	}
	return json({ items: allPlaylists });
}
