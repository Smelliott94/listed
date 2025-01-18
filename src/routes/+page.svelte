<script lang="ts">
    import { getSpotifyAuthUrl } from '$lib/spotifyAuth';
    import type { Playlist, PlaylistResponse } from "$lib/types/spotify";
	import { onMount } from 'svelte';

    let playlists: Playlist[] = [];

    async function login() {
        const url = await getSpotifyAuthUrl();
        window.location.href = url;
    }

    async function fetchPlaylists() {
        const response = await fetch('/api/playlists')
        if (response.ok) {
            const data: PlaylistResponse = await response.json();
            playlists = data.items;
        } else {
            console.error('Failed to fetch playlists');
        }
    }

</script>

<button on:click={login}>Login with Spotify</button>
<button on:click={fetchPlaylists}>Get playlists</button>

{#if playlists.length}
    <ul>
        {#each playlists as playlist}
            <li>{playlist.name}</li>
        {/each}
    </ul>
{:else}
    <p>No playlists found.</p>
{/if}
