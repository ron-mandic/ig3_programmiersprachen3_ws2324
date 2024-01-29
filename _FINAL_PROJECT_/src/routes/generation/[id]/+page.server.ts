import { BASE_URL } from '$lib/ts/constants';
import { EEndpoints } from '$lib/ts/enum';
import type { TNamedAPIResource } from '$lib/ts/types';
import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad = async ({ fetch, params }: PageServerLoadEvent) => {
	try {
		const generationUrl = BASE_URL + EEndpoints.GENERATION + params.id;
		const generationData: any = await fetch(generationUrl).then((res) => res.json());

		// Get the pokemon species url from the generation data
		const pokemonSpeciesUrls = generationData.pokemon_species.map(
			(pokemonSpecies: TNamedAPIResource) => pokemonSpecies.url
		);

		// Get the pokemon species data
		const pokemonSpeciesData: any = await Promise.all(
			pokemonSpeciesUrls.map((url: string) => fetch(url).then((res) => res.json()))
		);

		// Get the pokemon data
		const pokemonData = await Promise.all(
			pokemonSpeciesUrls.map((url: string) =>
				fetch(url.replace('-species', '')).then((res) => res.json())
			)
		);

		// Sort the pokemon species data and pokemon data by id
		pokemonSpeciesData.sort((a, b) => a.id - b.id);
		pokemonData.sort((a, b) => a.id - b.id);

		// Merge the pokemon species data and pokemon data into one object
		const data = pokemonSpeciesData.map((pokemonSpecies, i) => ({
			...pokemonSpecies,
			...pokemonData[i]
		}));

		return {
			status: 200,
			body: data
		};
	} catch (error) {
		return {
			status: 500,
			error: "Error 500: Can't fetch data from API"
		};
	}
};
