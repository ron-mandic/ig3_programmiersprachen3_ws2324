<script lang="ts">
	import { page } from '$app/stores';
	import Footer from '$lib/svelte/Footer.svelte';
	import PokemonGeneration from '$lib/svelte/Pokemon/PokemonGeneration.svelte';

	export let data;
</script>

<PokemonGeneration {data} {page} />
<Footer />
