import { BASE_URL } from '$lib/ts/constants';
import { EEndpoints } from '$lib/ts/enum';
import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad = async ({ fetch, url }: PageServerLoadEvent) => {
	try {
		let apiUrl = BASE_URL + EEndpoints.POKEMON;
		const apiUrlLimit = url.searchParams.get('limit');

		if (apiUrlLimit) {
			apiUrl += `?limit=${apiUrlLimit}`;
		}

		return {
			body: (await fetch(apiUrl)).json()
		};
	} catch (error) {
		console.error(error);
	}
};
