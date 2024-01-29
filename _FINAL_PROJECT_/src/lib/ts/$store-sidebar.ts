import { writable } from 'svelte/store';

export const storeIsOpen = writable<boolean>(false);
