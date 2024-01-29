<script lang="ts">
	import { page } from '$app/stores';
	import { storeIsOpen } from '$lib/ts/$store-sidebar';
	import Footer from '$lib/svelte/Footer.svelte';
	import PokemonGeneration from '$lib/svelte/Pokemon/PokemonGeneration.svelte';
	export let data;

	let generation = $page.params.id;
</script>

<svelte:head>
	<title>Pokémon - Generations {generation}</title>
	<meta name="description" content="Pokédex - Generations {generation}" />
</svelte:head>

<svelte:body
	on:keypress={(event) => {
		if (event.key === ' ') event.preventDefault();
	}}
/>

<PokemonGeneration {data} {page} />
<Footer />
