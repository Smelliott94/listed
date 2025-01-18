export interface Playlist {
	id: string;
	name: string;
	uri: string;
	description?: string;
}

export interface PlaylistResponse {
	items: Playlist[];
	total: number;
	limit: number;
	offset: number;
	next: string | null;
}
