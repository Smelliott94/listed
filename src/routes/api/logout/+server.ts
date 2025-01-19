import { json } from '@sveltejs/kit';

export async function POST({ cookies }) {
	cookies.delete('access_token', { path: '/' });
	cookies.delete('refresh_token', { path: '/' });
	return json({ message: 'Logout success' });
}
