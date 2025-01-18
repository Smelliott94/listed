export interface Playlist {
    id: string;
    name: string;
    uri: string;
    description?: string;
}

export interface PlaylistResponse {
    items: Playlist[];
}