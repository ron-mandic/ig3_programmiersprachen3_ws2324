<script lang="ts">
	import Sidebar from '$lib/svelte/Sidebar.svelte';
	import PokemonCards from '$lib/svelte/Pokemon/PokemonCards.svelte';
	import { searchFor, getTypes, filterBy, TypeStore } from '$lib/ts/functions';
	import { typeStore } from '$lib/ts/$store-sidebar-types';
	import { slide } from 'svelte/transition';
	export let data: any;
	export let page: any;

	// Props
	let value = '';
	const handlers = {
		handleSearchInput(event: any) {
			const target = event.target as HTMLInputElement;
			value = target.value;
		},
		handleTypeChange(event: any) {
			const target = event.target as HTMLInputElement;
			const name = target.dataset.name as string;

			typeStore.set({ ...$typeStore, [name]: target.checked });
		}
	};

	// Reactive Code
	$: species = filterBy(searchFor(data.body, value), {
		types: $typeStore
	});

	// $: if (typeStore) {
	// 	console.log($typeStore);
	// }
</script>

<div class="frame">
	<div class="layout h-full w-full pb-4">
		<aside>
			<Sidebar bind:value {handlers} {typeStore} types={getTypes(data.body)} />
		</aside>
		<section>
			{#if species?.length === 0}
				<div class="flex h-full items-center justify-center">
					<img
						src="/svg/icon-error.svg"
						alt="Pikachu"
						class="dark-opacity-100 w-1/2 scale-50 opacity-10 dark:invert-0"
						transition:slide
					/>
				</div>
			{:else}
				<PokemonCards {species} {value} />
			{/if}
		</section>
	</div>
</div>

<style lang="scss">
	.layout {
		--flex-basis: clamp(350px, 25%, 400px);
		margin-top: clamp(500px, 20vh, 70svh);
		padding: 0.675rem 0.675rem 10rem 0.675rem;
	}

	aside {
		display: none; // TODO: Make responsive and mobile friendly
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
				z-index: 2;
			}
		}
	}
</style>
