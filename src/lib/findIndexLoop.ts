// TODO: rename to `findIndex`

/**
 * Complex search by array top to down or vice versa
 *
 * Loop search from start index until start index inclusive
 *
 * @param items array of items
 * @param predicate callback to check suitable
 * @param direction 1 to positive search, -1 to negative search
 */
export const findIndexLoop = <T extends unknown>(
	items: readonly T[],
	predicate: (item: T, iteration: number, items: readonly T[]) => boolean,
	startIndex = 0,
	direction: 1 | -1 = 1,
	/**
	 * allow disable loop search
	 */
	loop = true,
) => {
	const lastIndex = items.length - 1;

	// Prevent work when index out of bound
	if (startIndex > lastIndex || startIndex < 0) {
		throw new Error('Array out of bounds');
	}

	let index = startIndex;
	let iteration = 0;
	let isAllowSelfCheck = true;

	while (index !== startIndex || isAllowSelfCheck) {
		if (index === startIndex) {
			isAllowSelfCheck = false;
		}

		const item = items[index];
		if (item !== undefined) {
			const isSuitableItem = predicate(item, iteration, items);
			if (isSuitableItem) return index;
		}

		iteration++;
		index += direction;

		// Reset index to opposite end by going out of bounds
		if (direction === 1 && index > lastIndex) {
			if (!loop) break;

			index = 0;
			continue;
		} else if (direction === -1 && index < 0) {
			if (!loop) break;

			index = lastIndex;
			continue;
		}
	}

	return -1;
};
