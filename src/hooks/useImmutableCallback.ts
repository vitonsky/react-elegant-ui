import { DependencyList, useCallback, useRef } from 'react';

/**
 * Return immutable wrapper for callback
 *
 * You can still redefine callback while updating props, but will get same object
 *
 * This especial useful to create callback for event handlers who required same object to remove
 */
export const useImmutableCallback = <T extends (...args: any[]) => any>(
	callback: T,
	deps: DependencyList,
): T => {
	// Update callback only by deps changes
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const actualCallback = useCallback(callback, deps);

	// Write reference to actual callback
	const callbackRef = useRef(actualCallback);
	callbackRef.current = actualCallback;

	// Return same wrapper
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const staticCallback = useCallback(
		((...args) => callbackRef.current(...args)) as T,
		[],
	);

	return staticCallback;
};
