import { json, redirect } from '@sveltejs/kit';
import { PUBLIC_CLIENT_ID } from "$env/static/public";
import { PUBLIC_CALLBACK_URI } from "$env/static/public";

export async function GET({ url, cookies }) {
    const code = url.searchParams.get('code');
    console.log(code);
    if (!code) throw redirect(302, '/');

    const verifier = cookies.get('pkce_verifier'); // Retrieve saved PKCE code
    console.log(verifier);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: PUBLIC_CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: PUBLIC_CALLBACK_URI,
            code_verifier: verifier!
        }),
    });

    const data = await response.json();
    console.log(data);

    // Store access & refresh tokens in HTTP-only cookies
    cookies.set('access_token', data.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 3600 // 1 hour
    });

    cookies.set('refresh_token', data.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 30 // 30 days
    });

    throw redirect(302, '/'); // Redirect to playlists page
}
