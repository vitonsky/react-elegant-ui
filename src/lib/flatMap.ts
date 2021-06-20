/**
 * Flatten array
 *
 * Handler take basic item and return result item or array of it
 * and array will flatten
 */
export const flatMap = <T = any, E = T>(
	itemList: T[],
	fn: (item: T) => E | E[],
): E[] => {
	return itemList.reduce((prev: E[], item: T) => {
		const handledData = fn(item);
		return prev.concat(handledData);
	}, []);
};
