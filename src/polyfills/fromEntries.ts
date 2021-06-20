// TODO: infer types of values and support case `fromEntries([['a', 'b'], ['b', 'c'], ['c', 123]])`

/**
 * Simple polyfill for Object.fromEntries
 */
export const fromEntries = <T extends string = any>(
	entries: Array<[T, any]>,
): Record<T, any> =>
		entries.reduce((acc, [key, value]) => {
			acc[key] = value;
			return acc;
		}, {} as Record<T, any>);
