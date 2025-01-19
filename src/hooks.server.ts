import type { Handle } from '@sveltejs/kit';
import { PUBLIC_CLIENT_ID } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
	let access_token = event.cookies.get('access_token');
	const refresh_token = event.cookies.get('refresh_token');

	if (!access_token && refresh_token) {
		console.log('Refreshing Spotify token...');

		const response = await fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				client_id: PUBLIC_CLIENT_ID,
				grant_type: 'refresh_token',
				refresh_token
			})
		});

		const data = await response.json();
		if (data.access_token) {
			access_token = data.access_token;

			event.cookies.set('access_token', access_token!, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				path: '/',
				maxAge: 3600 // 1 hour
			});
		}
	}
	return resolve(event);
};
