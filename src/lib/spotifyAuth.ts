import { PUBLIC_CLIENT_ID } from '$env/static/public';
import { PUBLIC_CALLBACK_URI } from '$env/static/public';

function generateRandomString(length: number) {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const values = crypto.getRandomValues(new Uint8Array(length));
	return values.reduce((acc, x) => acc + possible[x % possible.length], '');
}

async function generateCodeChallenge(verifier: string) {
	const encoder = new TextEncoder();
	const data = encoder.encode(verifier);
	const digest = await crypto.subtle.digest('SHA-256', data);
	return btoa(String.fromCharCode(...new Uint8Array(digest)))
		.replace(/=/g, '')
		.replace(/\+/g, '-')
		.replace(/\//g, '_');
}

export async function getSpotifyAuthUrl() {
	const redirectUri = encodeURIComponent(PUBLIC_CALLBACK_URI);
	const verifier = generateRandomString(64);
	const challenge = await generateCodeChallenge(verifier);

	document.cookie = `pkce_verifier=${verifier}; path=/; max-age=3600`;

	return (
		`https://accounts.spotify.com/authorize?` +
		`client_id=${PUBLIC_CLIENT_ID}` +
		`&response_type=code` +
		`&redirect_uri=${redirectUri}` +
		`&code_challenge_method=S256` +
		`&code_challenge=${challenge}` +
		`&scope=playlist-read-private playlist-read-collaborative user-read-email`
	);
}
