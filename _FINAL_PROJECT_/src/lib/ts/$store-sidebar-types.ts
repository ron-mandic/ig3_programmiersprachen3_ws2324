import { writable } from 'svelte/store';

export const typeStore = writable<{ [key: string]: boolean }>({});
