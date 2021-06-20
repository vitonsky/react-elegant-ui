import { useRef, useEffect } from 'react';

/**
 * Return init value or previous value
 *
 * By default, in first time will return same value
 */
export const usePrevious = <V, I = null>(value: V, init?: V | I) => {
	const ref = useRef<V | I>(init as any);

	// Update after render
	useEffect(() => {
		ref.current = value;
	});

	return ref.current;
};
