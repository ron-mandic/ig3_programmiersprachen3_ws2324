import { writable } from 'svelte/store';

export const colorStore = writable<{ [key: string]: boolean }>({});
