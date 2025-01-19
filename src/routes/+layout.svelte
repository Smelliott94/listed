<script lang="ts">
	import '../app.css';
	import { DarkMode } from 'flowbite-svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { getSpotifyAuthUrl } from '$lib/spotifyAuth';
	import type { Playlist, PlaylistResponse } from '$lib/types/spotify';
	import { Card, GradientButton } from 'flowbite-svelte';

	let playlists: Playlist[] = [];

	async function login() {
		const url = await getSpotifyAuthUrl();
		window.location.href = url;
	}
	$: activeUrl = '/';
</script>

<Navbar>
	<NavBrand href="/">
		<DarkMode />
		<span class="navbar-expand-lg text-4xl font-semibold dark:text-white">Listed</span>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi
			><GradientButton shadow color="green" on:click={login}
				>Login with Spotify
			</GradientButton></NavLi
		>
	</NavUl>
</Navbar>
<slot></slot>
