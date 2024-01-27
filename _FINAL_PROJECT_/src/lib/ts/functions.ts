import type { TNamedAPIResource } from './types';

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

export function formatWeight(hg: number) {
	const kg = hg / 10;
	return kg.toFixed(1) + ' kg';
}

export function formatSearch(inputText: string, searchText: string) {
	if (!searchText) return inputText;

	const escapedSearchText = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	const regExp = new RegExp(`(${escapedSearchText})`, 'gi');
	const markedText = inputText.replace(regExp, '<mark>$1</mark>');

	return markedText;
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
export function filterBy(pokemonList: any[], options: { [key: string]: object }) {
	let arr = [...pokemonList];

	if (options.types) {
		// @ts-expect-error No matching type
		if (Store.isEmpty(options.types)) return [];

		arr = pokemonList.filter((pokemon) => {
			for (const type of pokemon.types) {
				// @ts-expect-error No matching type
				if (options.types[type.type.name]) return true;
			}
			return false;
		});
	}

	if (options.colors) {
		// @ts-expect-error No matching type
		if (Store.isEmpty(options.colors)) return [];

		arr = arr.filter((pokemon) => {
			// @ts-expect-error No matching type
			return options.colors[pokemon.color.name];
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

// ############################################################################ Store
// typeStore
export class Store {
	static init(types: string[]) {
		const obj: { [key: string]: boolean } = {};
		for (const type of types) {
			obj[type] = true;
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
}
