import { Ref, MutableRefObject } from 'react';

/**
 * Set value to any ref object
 */
export const setRefValue = <T extends unknown>(ref: Ref<T>, value: T) => {
	// Skip empty ref
	if (ref === null) return;

	if (typeof ref === 'function') {
		ref(value);
	} else if (typeof ref === 'object') {
		(ref as MutableRefObject<T>).current = value;
	} else {
		throw Error('Unknown type of ref object');
	}
};
