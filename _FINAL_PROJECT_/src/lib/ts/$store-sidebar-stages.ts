import { writable } from 'svelte/store';

export const stageStore = writable<{ [key: string]: -1 | 0 | 1 }>({});
