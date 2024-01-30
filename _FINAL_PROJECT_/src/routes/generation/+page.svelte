<script lang="ts">
	import { parseToInteger, toCapitalized } from '$lib/ts/functions.js';
	import { navigating, page } from '$app/stores';
	import Loader from '$lib/svelte/Loader.svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	export let data;
</script>

<svelte:head>
	<title>Pokémon - Generations</title>
	<meta name="description" content="Pokédex - Generations" />
</svelte:head>

<div class="rootFrame">
	<h1 class="absolute max-w-[600px] p-5 text-7xl font-bold">Generations</h1>
	<div class="relative">
		<div class="layouts">
			{#each data.body.results as { name, url }}
				{#if url}
					{@const romanNumeral = name.split('-')[1]}
					{@const id = parseToInteger(romanNumeral)}
					<a class="layout h-full mask" href="/generation/{id}">
						<h2 class="px1 py-1 text-3xl font-semibold">
							{name
								.split('-')
								.map((word, i) => {
									if (i === 0) return toCapitalized(word);
									else return word.toUpperCase();
								})
								.join(' ')}
						</h2>
					</a>
				{/if}
			{/each}
		</div>
	</div>
</div>
{#if $navigating?.complete && !$page.url.pathname !== '/'}
	<div
		class="overlay fixed left-0 top-0 flex h-full w-full items-center justify-center mask"
		style="background-color: var(--background-alpha); backdrop-filter: blur(10px);"
	>
		<div
			class="scale-150"
			transition:fly={{ delay: 200, duration: 300, x: 0, y: 10, opacity: 0, easing: quintOut }}
		>
			<Loader />
		</div>
	</div>
{/if}

<style lang="scss">
	.rootFrame {
		width: 100%;
		height: 100vh;
		background-image: linear-gradient(to top, var(--background), var(--background-alpha)),
			url('/png/bg.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		padding-top: 125px;

		div {
			width: 100%;
			height: 100%;
			max-height: 100svh;
		}
	}

	h1 {
		font-size: 350%;
		line-height: 1.25;
	}

	.layouts {
		position: absolute;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 1rem;
		width: 100% !important;
		height: 200px !important;
		overflow-y: hidden;
		overflow-x: scroll;
		scroll-snap-type: x mandatory;
	}

	.layout {
		padding: 1.25rem 1.75rem;
		width: 100%;
		min-width: 320px;

		background-color: #ccc;
		border-radius: 1.5rem;
		backdrop-filter: blur(30px);
		border: 2px solid #aaa;
		backdrop-filter: blur(30px);
		transition: scale 0.25s ease-in-out;
		scroll-snap-align: center;

		&:hover {
			scale: 1.05;
			transition: scale 0.25s ease-in-out;
		}

		&:not(.active),
		&:not(.active):hover {
			opacity: 0.75;
		}

		&::before {
			content: url('/svg/favicon-bw.svg');
			position: absolute;
			top: 50%;
			left: 50%;
			width: 30%;
			height: auto;
			aspect-ratio: 1;
			transform: translate(calc(-50% - 2rem), -50%);
			z-index: 1000;
			filter: invert(1);
			mix-blend-mode: overlay;
			opacity: 0.125;
			scale: 0.75;
		}
	}

	@media screen and (min-width: 768px) {
		.layout {
			width: 400px !important;
		}
	}

	@media (prefers-color-scheme: dark) {
		.layout {
			background-color: var(--background-alpha);
			border: 4px solid #11111123;
		}
	}
</style>
