<script lang="ts">
	import '../app.css';
	import { DarkMode } from 'flowbite-svelte';
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

<Navbar>
	<NavBrand href="/">
		<DarkMode />
		<span class="navbar-expand-lg text-4xl font-semibold dark:text-white">Listed</span>
	</NavBrand>
	<NavUl {activeUrl}>
		<NavLi>
			{#if loggedin}
				<GradientButton shadow color="green" on:click={login}>Logged in</GradientButton>
			{:else}
				<GradientButton shadow color="green" on:click={login}>Login with Spotify</GradientButton>
			{/if}
		</NavLi>
	</NavUl>
</Navbar>
<slot></slot>
