import {
	EffectCallback,
	DependencyList,
	useEffect,
	useLayoutEffect,
} from 'react';

import { canUseDOM } from '../lib/canUseDOM';

/**
 * Use `useEffect` for SSR and `useLayoutEffect` on client to avoid warning
 */
export function useIsomorphicLayoutEffect(
	fn: EffectCallback,
	deps?: DependencyList,
): void {
	// deps must be spread, hence ignore linter
	// eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
	return canUseDOM() ? useLayoutEffect(fn, deps) : useEffect(fn, deps);
}
