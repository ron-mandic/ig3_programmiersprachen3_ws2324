import { BASE_URL } from '$lib/ts/constants';
import { EEndpoints } from '$lib/ts/enum';
import type { PageServerLoad, PageServerLoadEvent } from './[id]/$types';

export const load: PageServerLoad = async ({ fetch }: PageServerLoadEvent) => {
	try {
		const generationUrl = BASE_URL + EEndpoints.GENERATION;
		const data = await fetch(generationUrl).then((res) => res.json());

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
