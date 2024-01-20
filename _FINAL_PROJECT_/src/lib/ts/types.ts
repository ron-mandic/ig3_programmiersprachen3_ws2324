type TLocale = {
	[lang: string]: {
		[path: string]: {
			[key: string]: string | string[];
		};
	};
};
type TLocaleKey = keyof TLocale;
type TLocalePath<T extends TLocaleKey> = keyof TLocale[T];

export type { TLocale, TLocaleKey, TLocalePath };
