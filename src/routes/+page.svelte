<script lang="ts">
	import type { Playlist, PlaylistResponse } from '$lib/types/spotify';
	import {
		Card,
		GradientButton,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	let playlists: Playlist[] = [];

	onMount(() => {
		const cachedPlaylists = localStorage.getItem('playlists');

		if (cachedPlaylists) {
			playlists = JSON.parse(cachedPlaylists);
		}
	});

	async function fetchPlaylists() {
		const response = await fetch('/api/playlists');
		if (response.ok) {
			const data: PlaylistResponse = await response.json();
			playlists = data.items;
			localStorage.setItem('playlists', JSON.stringify(playlists));
		} else {
			console.error('Failed to fetch playlists');
		}
	}
</script>

<main class="ml-8 space-y-6">
	<GradientButton shadow color="green" on:click={fetchPlaylists}>Get playlists</GradientButton>
	{#if playlists.length}
		<Table>
			<TableHead>
				<TableHeadCell>Playlist name</TableHeadCell>
			</TableHead>
			<TableBody>
				{#each playlists as playlist}
					<TableBodyRow>
						<TableBodyCell class="text-gray-900 dark:text-white">{playlist.name}</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
		<ul></ul>
	{:else}
		<Card>No playlists found.</Card>
	{/if}
</main>
