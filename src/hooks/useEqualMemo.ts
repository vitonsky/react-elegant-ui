import { DependencyList, useRef } from 'react';
import { isEqual } from '../lib/isEqual';
import { usePrevious } from './usePrevious';

/**
 * It work like standard `useMemo`, but deep compare deps to equal
 *
 * It useful when you every time create new object (for example use destructuring),
 * but you wish recalculate something only with real changes
 */
export const useEqualMemo = <T>(
	factory: () => T,
	deps: DependencyList | undefined,
): T => {
	const value = useRef<T>();
	const prevDeps = usePrevious(deps, null);

	// Check to return old value
	if (
		deps !== undefined &&
		prevDeps &&
		(deps === prevDeps ||
			deps.every((dep, idx) => isEqual(dep, prevDeps[idx])))
	) {
		return value.current as T;
	}

	// Make new value
	const newValue = factory();
	value.current = newValue;
	return newValue;
};
