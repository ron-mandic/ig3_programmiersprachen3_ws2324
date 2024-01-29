// ############################################################################ String
export function toCapitalized(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

// formatting
export function formatId(id: number, length: number = 4) {
	if (id <= 0) throw new Error('fomatId: Your value must be positive');
	return '# ' + id.toString().padStart(length, '0');
}

export function formatHeight(dm: number) {
	const m = dm / 10;
	return m.toFixed(2) + ' m';
}

export function formatName(str: string) {
	let $0 = str;

	if (str.endsWith('-m')) $0 = $0.slice(0, -2);
	else if (str.endsWith('-male')) $0 = $0.slice(0, -5);
	else if (str.endsWith('-f')) $0 = $0.slice(0, -2);

	if (str.endsWith('-mime')) $0 = $0.replace('-mime', '');
	if (str.endsWith('-normal')) $0 = $0.replace('-normal', '');
	if (str.endsWith('-plant')) $0 = $0.replace('-plant', '');
	if (str.endsWith('-jr')) $0 = $0.replace('-jr', ' Jr.');
	if (str.endsWith('-z')) $0 = $0.replace('-z', '');
	if (str.endsWith('-altered')) $0 = $0.replace('-altered', '');
	if (str.endsWith('-land')) $0 = $0.replace('-land', '');
	if (str.endsWith('-land')) $0 = $0.replace('-land', '');
	if (str.endsWith('-red-striped')) $0 = $0.replace('-red-striped', '');
	if (str.endsWith('-standard')) $0 = $0.replace('-standard', '');
	if (str.endsWith('-incarnate')) $0 = $0.replace('-incarnate', '');
	if (str.endsWith('-ordinary')) $0 = $0.replace('-ordinary', '');
	if (str.endsWith('-aria')) $0 = $0.replace('-aria', '');
	if (str.endsWith('-shield')) $0 = $0.replace('-shield', '');
	if (str.endsWith('-average')) $0 = $0.replace('-average', '');
	if (str.endsWith('-50')) $0 = $0.replace('-50', '');
	if (str.endsWith('-baile')) $0 = $0.replace('-baile', '');
	if (str.endsWith('-midday')) $0 = $0.replace('-midday', '');
	if (str.endsWith('-solo')) $0 = $0.replace('-solo', '');
	if (str.endsWith('-null')) $0 = $0.replace('-null', '');
	if (str.endsWith('-red-meteor')) $0 = $0.replace('-red-meteor', '');
	if (str.endsWith('-disguised')) $0 = $0.replace('-disguised', '');
	if (str.endsWith('-koko')) $0 = $0.replace('-koko', ' Koko');
	if (str.endsWith('-lele')) $0 = $0.replace('-lele', ' Lele');
	if (str.endsWith('-bulu')) $0 = $0.replace('-bulu', ' Bulu');
	if (str.endsWith('-fini')) $0 = $0.replace('-fini', ' Fini');
	if (str.endsWith('-amped')) $0 = $0.replace('-amped', '');
	if (str.endsWith('-rime')) $0 = $0.replace('-rime', '. Rime');
	if (str.endsWith('-ice')) $0 = $0.replace('-ice', '');
	if (str.endsWith('-full-belly')) $0 = $0.replace('-full-belly', '');
	if (str.endsWith('-single-strike')) $0 = $0.replace('-single-strike', '');

	return $0;
}

export function formatSearch(inputText: string, searchText: string) {
	if (!searchText) return inputText;

	const escapedSearchText = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	const regExp = new RegExp(`(${escapedSearchText})`, 'gi');
	const markedText = inputText.replace(regExp, '<mark>$1</mark>');

	return markedText;
}

export function formatWeight(hg: number) {
	const kg = hg / 10;
	return kg.toFixed(1) + ' kg';
}

export function formatGrowthRate(str: string) {
	if (str === 'slow') return 'Slow';
	if (str === 'medium') return 'Medium';
	if (str === 'fast') return 'Fast';
	if (str === 'medium-slow') return 'Medium-Slow';
	if (str === 'slow-then-very-fast') return 'Slow → Fast';
	if (str === 'fast-then-very-slow') return 'Fast → Slow';
	return str;
}

export function formatSortValue(str: string) {
	if (str === 'id-asc') return 'Sort by ID (ASC)';
	if (str === 'id-desc') return 'Sort by ID (DESC)';
	if (str === 'name-asc') return 'Sort by Name (ASC)';
	if (str === 'name-desc') return 'Sort by Name (DESC)';
	if (str === 'height-asc') return 'Sort by Height (ASC)';
	if (str === 'height-desc') return 'Sort by Height (DESC)';
	if (str === 'weight-asc') return 'Sort by Weight (ASC)';
	if (str === 'weight-desc') return 'Sort by Weight (DESC)';
	return str;
}

// parsing
export function parseToRoman(url: string): string | null {
	const match = url.match(/\/(\d+)\/$/);

	if (match) {
		const number = parseInt(match[1], 10);

		if (number >= 1 && number <= 9) {
			const romanNumerals = ['', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix'];
			return romanNumerals[number];
		}
	}

	return null;
}

// extracting
export function extractNumber(url: string): number | null {
	const match = url.match(/\/(\d+)\/$/);

	if (match) {
		const number = parseInt(match[1], 10);
		return isNaN(number) ? null : number;
	}

	return null;
}

export function formatFlavorTextEntry(sentence: string) {
	return (
		sentence
			.replaceAll('PokéMon', 'Pokémon')
			.replaceAll(/\\n/g, ' ')
			.replaceAll(/\\f/g, ' ')
			// eslint-disable-next-line no-control-regex
			.replace(/[\x00-\x1F\x7F-\x9F]/g, ' ')
			.replaceAll(/\b[A-Z]+\b/g, (match) =>
				toCapitalized(match.toLocaleLowerCase('en-US').replace(/./g, '$&'))
			)
	);
}

// ############################################################################ Boolean
export function isId(arg: string) {
	return !isNaN(parseInt(arg, 10));
}

// ############################################################################ Array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function searchFor(pokemonList: any[], arg: string): any[] {
	if (!arg) return pokemonList;

	return isId(arg)
		? pokemonList.filter((pokemon) => pokemon.id === +arg)
		: pokemonList.filter((pokemon) => pokemon.name.includes(arg.toLowerCase()));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterBy(pokemonList: any[], stores: { [key: string]: object }) {
	let arr = [...pokemonList];

	if (stores.types) {
		// @ts-expect-error No matching type
		if (Store.isEmpty(stores.types)) return [];

		arr = pokemonList.filter((pokemon) => {
			for (const type of pokemon.types) {
				// @ts-expect-error No matching type
				if (stores.types[type.type.name]) return true;
			}
			return false;
		});
	}

	if (stores.colors) {
		// @ts-expect-error No matching type
		if (Store.isEmpty(stores.colors)) return [];

		arr = arr.filter((pokemon) => {
			// @ts-expect-error No matching type
			return stores.colors[pokemon.color.name];
		});
	}

	if (stores.growthRates) {
		// @ts-expect-error No matching type
		if (Store.isEmpty(stores.growthRates)) return [];

		arr = arr.filter((pokemon) => {
			// @ts-expect-error No matching type
			return stores.growthRates[pokemon.growth_rate.name];
		});
	}

	stages: if (stores.stages) {
		// @ts-expect-error No matching type
		if (Store.isEmpty(stores.stages)) return [];
		// @ts-expect-error No matching type
		const isBaby = stores.stages['is_baby'];
		// @ts-expect-error No matching type
		const isLegendary = stores.stages['is_legendary'];
		// @ts-expect-error No matching type
		const isMythical = stores.stages['is_mythical'];

		if (isBaby === -1 && isLegendary === -1 && isMythical === -1) break stages;

		arr = arr.filter((pokemon) => {
			const isPokemonBaby = pokemon.is_baby;
			const isPokemonLegendary = pokemon.is_legendary;
			const isPokemonMythical = pokemon.is_mythical;

			if (
				(isBaby !== -1 && isPokemonBaby !== (isBaby === 0)) ||
				(isLegendary !== -1 && isPokemonLegendary !== (isLegendary === 0)) ||
				(isMythical !== -1 && isPokemonMythical !== (isMythical === 0))
			) {
				return false;
			}
			return true;
		});
	}

	return arr;
}

export function shuffle<T>(array: T[]) {
	let currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = random(0, currentIndex - 1);
		currentIndex -= 1;

		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getRandom(pokemonList: any[]) {
	return pokemonList[Math.floor(Math.random() * pokemonList.length)];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDict(pokemonList: any[], prop: string, get: (...args: any[]) => any) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dict: { [key: string]: any } = {};

	for (let i = 0; i < pokemonList.length; i++) {
		const pokemon = pokemonList[i];
		const args = get(pokemon, prop);

		if (args === null) continue;

		if (Array.isArray(args)) {
			for (const arg of args) {
				if (!dict[arg]) dict[arg] = 1;
				else dict[arg]++;
			}
		} else {
			if (!dict[args]) dict[args] = 1;
			else dict[args]++;
		}
	}

	return dict;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDictStages(pokemonList: any[]) {
	const dict = {
		is_baby: 0,
		is_legendary: 0,
		is_mythical: 0
	};

	for (const pokemon of pokemonList) {
		const { is_baby, is_legendary, is_mythical } = pokemon;
		if (is_baby) dict.is_baby += 1;
		if (is_legendary) dict.is_legendary += 1;
		if (is_mythical) dict.is_mythical += 1;
	}

	return dict;
}

export function getEmptyDictEntries(dict: { [key: string]: number }) {
	const entries = [];
	for (const key in dict) {
		if (dict[key] === 0) entries.push(key);
	}
	return entries;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTypes(pokemonList: any[]) {
	const setTypes = new Set();
	for (const pokemon of pokemonList) {
		for (const { type } of pokemon.types) {
			setTypes.add(type.name);
		}
	}
	return [...setTypes];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getColors(pokemonList: any[]) {
	const setColors = new Set();
	for (const pokemon of pokemonList) {
		setColors.add(pokemon.color.name);
	}
	return [...setColors];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getGrowthRates(pokemonList: any[]) {
	const setGrowthRates = new Set();
	for (const pokemon of pokemonList) {
		setGrowthRates.add(pokemon.growth_rate.name);
	}
	return [...setGrowthRates];
}

// ############################################################################ Promise
export function delay<T>(ms: number, value?: T): Promise<unknown> | Promise<T> {
	return value === undefined
		? new Promise((resolve) => setTimeout(resolve, ms))
		: new Promise((resolve) =>
				setTimeout(() => {
					resolve(value);
				}, ms)
			);
}

export async function get(url: string, ms?: number) {
	const response = await fetch(url);
	if (ms) await delay(ms);
	return response.json();
}

// ############################################################################ Number
export function random(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ############################################################################ Object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPokemonStats(stats: any[]) {
	const hp = stats.find((stat) => stat.stat.name === 'hp').base_stat;
	const attack = stats.find((stat) => stat.stat.name === 'attack').base_stat;
	const defense = stats.find((stat) => stat.stat.name === 'defense').base_stat;
	const specialAttack = stats.find((stat) => stat.stat.name === 'special-attack').base_stat;
	const specialDefense = stats.find((stat) => stat.stat.name === 'special-defense').base_stat;
	const speed = stats.find((stat) => stat.stat.name === 'speed').base_stat;
	return { hp, attack, defense, specialAttack, specialDefense, speed };
}

// ############################################################################ Functions
export function getSortingAlgorithm(sortValue: string) {
	switch (sortValue) {
		case 'id-asc': {
			return (a: { id: number }, b: { id: number }) => a.id - b.id;
		}
		case 'id-desc': {
			return (a: { id: number }, b: { id: number }) => b.id - a.id;
		}
		case 'name-asc': {
			return (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);
		}
		case 'name-desc': {
			return (a: { name: string }, b: { name: string }) => b.name.localeCompare(a.name);
		}
		default: {
			return (a: { id: number }, b: { id: number }) => a.id - b.id;
		}
	}
}

// ############################################################################ Store
// typeStore
export class Store {
	static init(types: string[] | number[], value: boolean = true) {
		const obj: { [key: string]: boolean } = {};
		for (const type of types) {
			obj[type] = value;
		}
		return obj;
	}
	static isSomeChecked(obj: { [key: string]: boolean }) {
		if (!obj) return false;
		for (const key in obj) {
			if (obj[key]) return true;
		}
		return false;
	}
	static isEmpty(obj: { [key: string]: boolean }) {
		for (const key in obj) {
			if (obj[key]) return false;
		}
		return true;
	}
	static getCheckedCount(obj: { [key: string]: boolean }) {
		let count = 0;
		for (const key in obj) {
			if (obj[key]) count++;
		}
		return count;
	}
	static isAllChecked(obj: { [key: string]: boolean }) {
		for (const key in obj) {
			if (!obj[key]) return false;
		}
		return true;
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static toString(store: any, callback?: (arg: string) => string) {
		const values = Object.entries(store);
		const names = [];

		for (let i = 0; i < values.length; i++) {
			const [name, checked] = values[i];
			if (checked) names.push(name);
		}

		return callback ? names.map(callback).join(', ') : names.map(toCapitalized).join(', ');
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static isAll(store: { [key: string]: any }, value: any) {
		for (const key in store) {
			if (store[key] !== value) return false;
		}
		return true;
	}
}

// ############################################################################ Pokémon
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getRandomFlavorTextEntry(pokemon: any, language = 'en') {
	const entries = pokemon.flavor_text_entries.filter(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(entry: any) => entry.language.name === language
	);
	const index = random(0, entries.length - 1);
	return entries[index].flavor_text;
}

export function formatStages(objStages: { [key: string]: -1 | 0 | 1 }) {
	/**
	 * labels: is_baby, is_legendary, is_mythical
	 * possible values: -1, 0, 1
	 * possible combinations: 27 (3^3)
	 */

	const labels: string[] = [];
	const { is_baby, is_legendary, is_mythical } = objStages;

	// Guard clauses
	if (is_baby === -1 && is_legendary === -1 && is_mythical === -1) return 'All unset';
	if (
		(is_baby === 0 && is_legendary === -1 && is_mythical === -1) ||
		(is_baby === 0 && is_legendary === 1 && is_mythical === 1)
	)
		return 'Baby only';
	if (
		(is_baby === -1 && is_legendary === 0 && is_mythical === -1) ||
		(is_baby === 1 && is_legendary === 0 && is_mythical === 1)
	)
		return 'Legendary only';
	if (
		(is_baby === -1 && is_legendary === -1 && is_mythical === 0) ||
		(is_baby === 1 && is_legendary === 1 && is_mythical === 0)
	)
		return 'Mythical only';
	if (is_baby === 0 && is_legendary === 0 && is_mythical === 0) return 'All true';
	if (is_baby === 1 && is_legendary === 1 && is_mythical === 1) return 'All false';

	// Regular clauses
	if (is_baby === 0) labels.push('Baby');
	if (is_legendary === 0) labels.push('Legendary');
	if (is_mythical === 0) labels.push('Mythical');

	return labels.join(', ');
}
