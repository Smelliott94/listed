<script lang="ts">
	import '../app.css';
	import { DarkMode, Indicator } from 'flowbite-svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { getSpotifyAuthUrl } from '$lib/spotifyAuth';
	import { GradientButton } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let loggedin = false;

	async function login() {
		const url = await getSpotifyAuthUrl();
		window.location.href = url;
	}
	async function checkLogin() {
		const response = await fetch('/api/check-auth');
		const data = await response.json();
		loggedin = data.loggedin;
	}

	onMount(() => {
		checkLogin();
	});
	$: activeUrl = '/';
</script>

<header class="flex items-center justify-between p-10">
	<h1 class="text-4xl font-semibold dark:text-white">Listed</h1>
	<div class="flex items-center gap-2">
		{#if loggedin}
			<Indicator color="green" size="lg"></Indicator>
		{:else}
			<GradientButton shadow color="green" on:click={login}>Log in with Spotify</GradientButton>
		{/if}
		<DarkMode />
	</div>
</header>	
<slot></slot>
