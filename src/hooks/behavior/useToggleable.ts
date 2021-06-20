import { useRef } from 'react';

import { useImmutableCallback } from '../useImmutableCallback';

export interface ToggleableParams {
	/**
	 * Current state
	 */
	state?: boolean;

	/**
	 * Hook to set state
	 */
	setState?: (state: boolean) => void;

	/**
	 * Don't change state
	 */
	disabled?: boolean;
}

export interface ToggleableControls {
	setState: (state: boolean) => void;
	toggle: () => void;
}

/**
 * Manage enable state
 */
export const useToggleable = ({
	state,
	setState: setStateExternal,
	disabled,
}: ToggleableParams): ToggleableControls => {
	const control = useRef<ToggleableControls | null>(null);

	const setState = useImmutableCallback(
		(state: boolean) => {
			if (setStateExternal !== undefined && !disabled) {
				setStateExternal(state);
			}
		},
		[disabled, setStateExternal],
	);

	const toggle = useImmutableCallback(() => {
		if (!disabled) {
			setState(!state);
		}
	}, [disabled, state, setState]);

	// Initialize
	if (control.current === null) {
		control.current = {
			setState,
			toggle,
		};
	}

	return control.current;
};
