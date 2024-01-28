<script lang="ts">
	import '../app.pcss';
	import '$lib/scss/styles.scss';
	import Header from '$lib/svelte/Header.svelte';
	import Main from '$lib/svelte/Main.svelte';
</script>

<svelte:head>
	<title>Pokédex - Home</title>
	<meta name="description" content="HfG-Pokémon - /" />
</svelte:head>

<div id="app">
	<Header />
	<Main>
		<slot />
	</Main>
</div>

<style lang="scss">
	@media only screen and (max-width: 320px) {
		:global(body)::after {
			content: url('/svg/favicon.svg');
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 50vw;
			height: auto;
			mix-blend-mode: overlay;
			animation: shakeX 5s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
		}

		#app {
			display: none;
		}

		@keyframes shakeX {
			10%,
			30%,
			50%,
			70%,
			90% {
				transform: translate3d(calc(-50% - 10px), -50%, 0);
			}

			20%,
			40%,
			60%,
			80%,
			100% {
				transform: translate3d(calc(-50% + 10px), -50%, 0);
			}
		}
	}
</style>
