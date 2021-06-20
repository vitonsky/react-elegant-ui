/**
 * Util to mix multiple classes
 */
export const classList = (...classes: (string | undefined)[]) =>
	classes
		.filter(
			(val, idx, arr) =>
				// Remove empty values
				Boolean(val) &&
				// Remove duplicates
				arr.findIndex((itemVal) => itemVal === val) === idx,
		)
		.join(' ');
