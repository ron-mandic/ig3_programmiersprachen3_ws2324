import { CAT_API_DOMAIN, CAT_API_VERSION } from "./constants";

async function catAPI(endpoint: string, objQueries = {}) {
	const url = !endpoint
		? CAT_API_DOMAIN + CAT_API_VERSION
		: CAT_API_DOMAIN +
		  CAT_API_VERSION +
		  endpoint +
		  toQueryString(objQueries);

	try {
		const res = await fetch(url);
		return await res.json();
	} catch (err) {
		console.error(err);
	}
}

/**
 *
 * This function shuffles the array in place.
 * It is using the Fisher-Yates algorithm.
 *
 */
function shuffle(array: any[]) {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex--);

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

/**
 *
 * This function shuffles the array and returns a subset of the array.
 * That makes sure duplicates are not returned.
 *
 */
function randomSubsetFrom(array: any[], length: number = 1) {
	const arrayShuffled = shuffle(array);
	return arrayShuffled.slice(0, length);
}

function toQueryString(obj: { [key: string]: any }) {
	if (!obj) return "";

	return (
		"?" +
		Object.keys(obj)
			.map(
				(key) =>
					`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
			)
			.join("&")
	);
}

export { catAPI, shuffle, randomSubsetFrom, toQueryString };
