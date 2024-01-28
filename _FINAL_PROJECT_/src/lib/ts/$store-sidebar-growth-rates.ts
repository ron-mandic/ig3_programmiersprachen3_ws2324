import { writable } from 'svelte/store';

export const growthRateStore = writable<{ [key: string]: boolean }>({});
