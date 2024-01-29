<script lang="ts">
	import '../app.pcss';
	import '$lib/scss/styles.scss';
	import Header from '$lib/svelte/Header.svelte';
	import Main from '$lib/svelte/Main.svelte';
	import { page } from '$app/stores';
	import { storeIsOpen } from '$lib/ts/$store-sidebar';
	import { fly } from 'svelte/transition';

	let id = $page.params.id;

	export function handleTriggerClick(e: any) {
		e.preventDefault();

		$storeIsOpen = !$storeIsOpen;
	}

	export let data;
</script>

<div id="app">
	<Header {id} isOpen={$storeIsOpen} on:click={handleTriggerClick} />
	<Main>
		<!-- Credits: https://joyofcode.xyz/sveltekit-page-transitions -->
		{#key data.url}
			<div in:fly={{ x: 100, duration: 300, delay: 300 }} out:fly={{ x: -100, duration: 300 }}>
				<slot />
			</div>
		{/key}
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
