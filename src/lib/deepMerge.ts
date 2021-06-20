// Usually you should use merge engine instead this. If need merge object - implement this handler

/**
 * Simply util to fast deep merge 2 objects
 */
export const deepMerge = <X extends {} | [], Y extends {} | []>(
	A: X,
	B: Y,
): X | Y => {
	if (Array.isArray(A) && Array.isArray(B)) {
		return [...A, ...B] as X & Y;
	} else if (
		typeof A === 'object' &&
		typeof B === 'object' &&
		!Array.isArray(A) &&
		!Array.isArray(B)
	) {
		const mergedObject: Record<string, any> = { ...A };

		for (const key in B) {
			if (
				typeof ((A as unknown) as Y)[key] === 'object' &&
				typeof B[key] === 'object'
			) {
				mergedObject[key] = deepMerge(
					((A as unknown) as Y)[key],
					B[key],
				);
			} else {
				mergedObject[key] = B[key];
			}
		}

		return mergedObject as X & Y;
	} else {
		return B;
	}
};
