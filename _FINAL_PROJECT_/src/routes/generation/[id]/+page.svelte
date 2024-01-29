<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/svelte/Footer.svelte';
	import PokemonGeneration from '$lib/svelte/Pokemon/PokemonGeneration.svelte';
	export let data;

	let generation = $page.params.id;
</script>

<svelte:head>
	<title>Pokémon - Generation {generation}</title>
	<meta name="description" content="Pokédex - Generation {generation}" />
</svelte:head>

<svelte:body
	on:keypress={(event) => {
		if (event.key === ' ') event.preventDefault();
	}}
/>

<PokemonGeneration {data} {page} />
<Footer />
