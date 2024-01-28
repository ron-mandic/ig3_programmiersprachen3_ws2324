import { writable } from 'svelte/store';

export const stageStore = writable<{ [key: string]: boolean }>({});
