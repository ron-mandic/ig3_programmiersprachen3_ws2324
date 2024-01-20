// ############################################################################ String
export function toCapitalized(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatId(id: number, length: number = 4) {
	if (id <= 0) throw new Error('fomatId: Your value must be positive');
	return '# ' + id.toString().padStart(length, '0');
}

export function formatHeight(dm: number) {
	const m = dm / 10;
	return m.toFixed(2) + ' m';
}

export function formatWeight(hg: number) {
	const kg = hg / 10;
	return kg.toFixed(1) + ' kg';
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

// ############################################################################ Number
export function random(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
