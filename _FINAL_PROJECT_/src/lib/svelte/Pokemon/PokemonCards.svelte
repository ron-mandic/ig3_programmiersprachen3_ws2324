<script lang="ts">
	import PokemonCard from './PokemonCard.svelte';
	export let species: any;
	export let value: string;
</script>

<div class="pokemon relative grid" data-length={species.length}>
	{#each species as pokemon (pokemon.id)}
		<div class="card-wrapper relative flex items-center justify-center">
			<PokemonCard {pokemon} {value} />
		</div>
	{/each}
</div>

<style lang="scss">
	.pokemon {
		grid-template-columns: repeat(auto-fill, minmax(221px, auto));

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
</style>
