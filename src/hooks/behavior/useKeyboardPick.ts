import { useEffect } from 'react';

import { KeyCodesList, isKeyCode } from '../../lib/keyboard';
import { useImmutableCallback } from '../useImmutableCallback';

export interface KeyboardPickParameters {
	/**
	 * Handlers work only when enabled
	 */
	enabled: boolean;

	/**
	 * Handler for pick active item, to which point a cursor
	 */
	onPick?: () => void;

	/**
	 * List of key codes which trigger pick event
	 *
	 * It will match with `code` property of native event
	 */
	pickKeys?: KeyCodesList;

	/**
	 * Phase to handle pick
	 */
	pickStrategy?: 'keydown' | 'keyup';

	/**
	 * Define event phase
	 *
	 * @default true
	 */
	eventCapture?: boolean;
}

/**
 * Global hook which implement keyboard selection
 */
export const useKeyboardPick = ({
	enabled,
	onPick,
	pickKeys,
	pickStrategy = 'keydown',
	eventCapture = true,
}: KeyboardPickParameters) => {
	const onPickHandler = useImmutableCallback(
		(evt: KeyboardEvent) => {
			if (pickKeys === undefined || !isKeyCode(evt.code, pickKeys))
				return;

			// Prevent anyway
			evt.preventDefault();

			// Pick by strategy
			if (evt.type === pickStrategy) {
				if (onPick !== undefined) {
					onPick();
				}
			}
		},
		[onPick, pickKeys, pickStrategy],
	);

	// Pick handler
	useEffect(() => {
		if (!enabled) return;

		document.addEventListener('keydown', onPickHandler, {
			capture: eventCapture,
		});
		document.addEventListener('keyup', onPickHandler, {
			capture: eventCapture,
		});

		return () => {
			document.removeEventListener('keydown', onPickHandler, {
				capture: eventCapture,
			});
			document.removeEventListener('keyup', onPickHandler, {
				capture: eventCapture,
			});
		};
	}, [enabled, eventCapture, onPickHandler]);
};
