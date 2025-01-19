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
		TableHeadCell,
		Toast
	} from 'flowbite-svelte';
	import { ExclamationCircleSolid } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	let playlists: Playlist[] = $state([]);
	let errorMessage = $state('');

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
			playlists = [];
			console.error('Failed to fetch playlists');
			errorMessage = response.statusText;
			setTimeout(() => (errorMessage = ''), 3000);
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
	{#if errorMessage}
		<div class="fixed bottom-4 left-1/2 -translate-x-1/2">
			<Toast color="red">
				<span slot="icon">
					<ExclamationCircleSolid class="h-5 w-5" />
					<span class="sr-only">Warning icon</span>
				</span>
				Error: {errorMessage}
			</Toast>
		</div>
	{/if}
</main>
