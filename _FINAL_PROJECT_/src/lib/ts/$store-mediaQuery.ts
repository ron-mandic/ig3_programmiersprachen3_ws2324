import { readable } from 'svelte/store';
export const useMediaQuery = (mediaQueryString: string) => {
	const matches = readable(null, (set) => {
		const m = window.matchMedia(mediaQueryString);
		// @ts-expect-error - we know m is a MediaQueryList
		set(m.matches);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const el = (e: any) => set(e.matches);
		m.addEventListener('change', el);
		return () => {
			m.removeEventListener('change', el);
		};
	});
	//then we return the readable
	return matches;
};
