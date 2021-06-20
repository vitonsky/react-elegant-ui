/**
 * Filtrate object properties
 *
 * By default will removed all properties that `Boolean` cast to `false`
 */
export const filterObject = <T extends string = any, Q = any>(
	obj: Record<T, Q>,
	predicate: (value: Q, key: T) => boolean = Boolean,
): Record<T, Q> => {
	const newObj = {} as Record<T, Q>;

	for (const key in obj) {
		const value = obj[key];
		if (predicate(value, key)) {
			newObj[key] = obj[key];
		}
	}

	return newObj;
};
