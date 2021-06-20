import { useRef, useCallback, RefCallback } from 'react';

import { useForceUpdate } from './useForceUpdate';

/**
 * Create `RefObject` and `RefCallback` which update `RefObject`
 *
 * This different from `useState` because will not update state
 * while set same object and this return always same `RefObject`
 *
 * It better than `RefCallback` for some cases, cuz you can
 * handle updates but also have access to `RefObject`
 */
export function useLiveRef<T extends unknown = undefined>(
	initialValue: T | null = null,
) {
	const ref = useRef<T | typeof initialValue>(initialValue);
	const forceUpdate = useForceUpdate();

	const setRef: RefCallback<T> = useCallback(
		(newRef) => {
			if (newRef !== ref.current) {
				ref.current = newRef;
				forceUpdate();
			}
		},
		[ref, forceUpdate],
	);

	return [ref, setRef] as const;
}
