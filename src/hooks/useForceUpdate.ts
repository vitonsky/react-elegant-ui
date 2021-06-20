import { useCallback, useState } from 'react';

/**
 * Hook to force re-render
 */
export const useForceUpdate = () => {
	const { 1: setState } = useState({});

	// New empty object always different other empty object and you never get integer overflow ;)
	const forceUpdate = useCallback(() => setState({}), [setState]);

	return forceUpdate;
};
