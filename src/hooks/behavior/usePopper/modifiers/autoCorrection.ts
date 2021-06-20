import { Modifier, StateRects } from '@popperjs/core';

import { isEqual } from '../../../../lib/isEqual';
import { StateWithModifierStorage } from '../types';

export type Options = {
	/**
	 * List of rects names to observe
	 */
	rects?: Array<keyof StateRects>;
};

type Storage = Partial<StateRects>;

/**
 * Modifier to auto correction of position
 *
 * This modifier compare rects with previous and force update if it is not equal
 * It fix cases when right after changes popup have wrong position and should recalculate it
 */
export const autoCorrection: Modifier<'autoCorrection', Options> = {
	name: 'autoCorrection',
	enabled: true,
	phase: 'main',
	fn: ({ state, instance, options }) => {
		const { rects = ['reference'] } = options;
		const patchedState: StateWithModifierStorage<
			'autoCorrection',
			Storage
		> = state as any;

		// Create modifier storage
		if (patchedState.__autoCorrection === undefined) {
			patchedState.__autoCorrection = {};
		}

		// Compare current rects with previous
		const prevData = patchedState.__autoCorrection;
		const isEqualData = rects.every((key) =>
			isEqual(prevData[key], state.rects[key]),
		);

		// Write new data and force update if need
		patchedState.__autoCorrection = { ...state.rects };
		if (!isEqualData) {
			instance.update();
		}
	},
};
