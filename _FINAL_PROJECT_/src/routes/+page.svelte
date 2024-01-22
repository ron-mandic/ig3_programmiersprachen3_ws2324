<script lang="ts">
	import Card from '$lib/svelte/Card.svelte';
	import Footer from '$lib/svelte/Footer.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;

	console.log(data);
</script>

<div class="frame">
	<div class="layout h-full w-full pb-4">
		<aside>
			<div class="sidebar flex flex-col items-start justify-start">
				<h2 class="p-4 pb-8 text-4xl font-bold">Pokémon</h2>
				<div class="sidebar-layout"></div>
			</div>
		</aside>
		<section>
			{#await data.body then { results }}
				<div class="pokemon relative grid" data-length={results.length}>
					{#each results as result}
						<div class="card-wrapper flex items-center justify-center">
							<Card {result} />
						</div>
					{/each}
				</div>
			{:catch _}
				<div class="pokemon error mt-2 flex w-full items-center justify-center">
					<div class="flex flex-col items-center justify-center">
						<img
							class="scale-50 opacity-5 invert-0 dark:opacity-30"
							src="/svg/icon-error.svg"
							alt="Pika-pi?"
						/>
					</div>
				</div>
			{/await}
		</section>
	</div>
</div>

<Footer />

<style lang="scss">
	.layout {
		--flex-basis: clamp(350px, 25%, 400px);
		margin-top: clamp(500px, 20vh, 70svh);
		padding: 0.675rem 0.675rem 10rem 0.675rem;

		aside {
			// TODO: Make responsive and mobile friendly
			display: none;
			position: fixed;
			top: calc(100px - 0.175rem);
			left: 0.5rem;
			width: min(90vw, 400px);
			height: calc(100svh - 100px + 0.175rem);
			padding: 0.675rem 1rem 0.375rem 0;
			z-index: 999;
		}

		section {
			flex: 0 0 calc(100% - var(--flex-basis));
			padding-top: 0.2rem;
			perspective: 100vh;
		}
	}

	.sidebar {
		--bg-color: hsl(240, 14%, 90%);
		--bg-color__sidebar: hsl(240, 14%, 87%);

		width: 100%;
		height: 100%;
		position: sticky;
		top: 100px;
		border-radius: 1.5rem;
		background-color: var(--bg-color);
		overflow-x: hidden;
		overflow-y: auto;
		padding: 0.675rem;

		.sidebar-layout {
			width: 100%;
			height: 100px;
			border-radius: calc(1.5rem - 0.675rem);
			background-color: var(--bg-color__sidebar);
		}
	}

	.pokemon {
		grid-template-columns: repeat(auto-fill, minmax(221px, auto));

		&.error {
			height: calc(100% - 1.125rem);
		}

		&::after {
			content: attr(data-length) ' Pokémon';
			position: absolute;
			top: -1.5rem;
			left: 0.5rem;
			translate: 0 -50%;
			width: fit-content;
			height: fit-content;
			font-weight: bold;
			font-size: 1.25rem;
		}

		.card-wrapper {
			aspect-ratio: 221 / 312;
			min-width: 221px;
			min-height: 312px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	@media only screen and (min-width: 1052px) {
		.layout {
			width: 100%;
			display: flex;

			aside {
				display: block;
				position: sticky;
				top: 100px;
				left: 0;
				width: 320px;
				height: calc(100svh - 100px);
				flex: 0 0 var(--flex-basis);
				padding: 0.675rem 1rem 0.675rem 0;
				z-index: 998;
			}
		}

		.sidebar {
			height: calc(100svh - 100px - 1.275rem); // 1rem for optical correction
		}
	}

	@media (prefers-color-scheme: dark) {
		.sidebar {
			--bg-color: hsl(244, 16%, 15%);
			--bg-color__sidebar: hsl(244, 16%, 18%);
		}
	}
</style>
