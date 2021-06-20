import { useCallback, useRef } from 'react';
import { useImmutableCallback } from './useImmutableCallback';

/**
 * Run callback after delay with knob to cancel
 *
 * When set new callback, previous will reset if it still did not run
 */
export const useDelayCallback = () => {
	const timerRef = useRef<number | null>(null);

	const reset = useCallback(() => {
		if (timerRef.current !== null) {
			window.clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	const set = useImmutableCallback(
		(handler: () => void, time = 0) => {
			reset();
			timerRef.current = window.setTimeout(handler, time);
		},
		[reset],
	);

	return [set, reset] as const;
};
