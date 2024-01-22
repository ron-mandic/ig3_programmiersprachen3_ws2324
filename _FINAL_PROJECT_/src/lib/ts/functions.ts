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

export async function get(url: string) {
	const response = await fetch(url);
	return response.json();
}

// ############################################################################ Number
export function random(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
