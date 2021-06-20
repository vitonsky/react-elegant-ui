import { Ref, useRef, useEffect } from 'react';
import { setRefValue } from '../lib/setRefValue';

/**
 * Manager of ref value. It update ref value and set `null` by unmount
 *
 * It useful when you wish use consistent ref to something inside your component
 */
export const useRefHost = <T extends unknown>(
	ref: Ref<T> | undefined,
	value: T,
) => {
	// Init local properties with unique symbols
	const localRef = useRef<Ref<T> | undefined>({} as any);
	const localValue = useRef<T>({} as any);

	// Update local objects
	if (localRef.current !== ref || localValue.current !== value) {
		localRef.current = ref;
		localValue.current = value;

		// Update ref
		if (ref !== undefined) {
			setRefValue<T>(ref, value);
		}
	}

	// Set null by destroy
	useEffect(() => {
		// Return only cleanup
		return () => {
			if (localRef.current === undefined) return;
			setRefValue<T | null>(localRef.current, null);
		};
	}, []);
};
