/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';
import { FILTER_TYPES_VALUES } from './constants';

export function createTypeStore() {
	const store = writable(FILTER_TYPES_VALUES);
	const { subscribe, set, update } = store;

	return {
		subscribe,
		// @ts-expect-error Element explicitly has an 'any' type
		get: (key: string): boolean => store[key],
		change: (key: string, value: boolean) => update((store: any) => ({ ...store, [key]: value })),
		reset: () => set(FILTER_TYPES_VALUES)
	};
}
