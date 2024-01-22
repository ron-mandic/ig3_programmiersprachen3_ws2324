<script lang="ts">
	import Card from '$lib/svelte/Card.svelte';
	import Footer from '$lib/svelte/Footer.svelte';
	import Indicator from '$lib/svelte/Loader.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;

	console.log(data);
</script>

<div class="frame">
	<div class="layout w-full h-full pb-4">
		<aside>
			<div class="sidebar"></div>
		</aside>
		<section>
			<div class="pokemon grid">
				{#await data.body}
					<Indicator />
				{:then { results }}
					{#each results as result}
						<div class="card-wrapper flex justify-center items-center">
							<Card {result} />
						</div>
					{/each}
				{:catch error}
					<p>{error.message}</p>
				{/await}
			</div>
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
			position: fixed;
			top: 0;
			left: 0;
			width: 320px;
			height: 100svh;
			padding: 0.5rem 1rem 1rem 0;
		}
		section {
			flex: 0 0 calc(100% - var(--flex-basis));
		}
	}

	.sidebar {
		--bg-color: hsl(240, 14%, 90%);

		width: 100%;
		height: calc(100svh - 100px - 1rem); // 1rem for optical correction
		position: sticky;
		top: 100px;
		border-radius: 1.5rem;
		background-color: var(--bg-color);
		overflow-x: hidden;
		overflow-y: auto;
	}

	.pokemon {
		grid-template-columns: repeat(auto-fill, minmax(221px, auto));

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
				position: sticky;
				top: 100px;
				height: calc(100svh - 100px);
				flex: 0 0 var(--flex-basis);
			}
		}
	}

	@media (prefers-color-scheme: dark) {
		.sidebar {
			--bg-color: hsl(244, 16%, 15%);
		}
	}
</style>
