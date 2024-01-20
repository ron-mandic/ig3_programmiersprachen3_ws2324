import { BASE_URL } from '$lib/ts/constants';
import { EEndpoints } from '$lib/ts/enum';
import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad = async ({ fetch, url }: PageServerLoadEvent) => {
	try {
		let apiUrl = BASE_URL + EEndpoints.POKEMON;
		const urlLimit = url.searchParams.get('limit');

		if (urlLimit) {
			apiUrl += `?limit=${urlLimit}`;
		}

		const response = await fetch(apiUrl);

		return {
			body: response.json()
		};
	} catch (error) {
		console.error(error);
	}
};
