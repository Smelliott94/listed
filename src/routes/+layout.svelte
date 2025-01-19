<script lang="ts">
	import '../app.css';
	import { DarkMode, Indicator } from 'flowbite-svelte';
	import { getSpotifyAuthUrl } from '$lib/spotifyAuth';
	import { GradientButton } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let isLoggedIn: boolean | null = $state(null);
	let { children } = $props();

	async function login() {
		const url = await getSpotifyAuthUrl();
		window.location.href = url;
	}
	async function checkLogin() {
		const response = await fetch('/api/check-auth');
		const data = await response.json();
		isLoggedIn = data.loggedin;
		localStorage.setItem('isloggedin', JSON.stringify(isLoggedIn));
	}

	async function logout() {
		const response = await fetch('api/logout', { method: 'POST' });
		if (response.ok) {
			isLoggedIn = false;
			localStorage.setItem('isloggedin', JSON.stringify(isLoggedIn));
		} else {
			console.error('Logout failed');
		}
	}

	onMount(() => {
		checkLogin();
	});
</script>

<header class="flex items-center justify-between p-10">
	<h1 class="text-4xl font-semibold dark:text-white">Listed</h1>
	<div class="flex items-center gap-2">
		{#if isLoggedIn}
			<Indicator title="logged in" color="green" size="lg"></Indicator>
			<GradientButton shadow color="red" on:click={logout}>Log out</GradientButton>
		{:else}
			<GradientButton shadow color="green" on:click={login}>Log in with Spotify</GradientButton>
		{/if}
		<DarkMode />
	</div>
</header>
{@render children()}
