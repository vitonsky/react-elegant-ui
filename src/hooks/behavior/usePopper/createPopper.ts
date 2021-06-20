import {
	popperGenerator,
	arrow,
	computeStyles,
	eventListeners,
	flip,
	popperOffsets,
	preventOverflow,
} from '@popperjs/core';

import { updateStyles } from './modifiers/updateStyles';
import { autoCorrection } from './modifiers/autoCorrection';
import { extendedEventListeners } from './modifiers/extendedEventListeners';
import { hide } from './modifiers/hide';
import { offset } from './modifiers/offset';
import { patchScaleFactor } from './modifiers/patchScaleFactor';

/**
 * Default modifiers for instance
 *
 * See docs for more info about: https://popper.js.org/docs/v2/modifiers
 */
const defaultModifiers = [
	updateStyles,
	autoCorrection,
	extendedEventListeners,
	arrow,
	computeStyles,
	eventListeners,
	flip,
	hide,
	offset,
	patchScaleFactor,
	popperOffsets,
	preventOverflow,
];

export type Modifiers = Partial<typeof defaultModifiers[number]>;

/**
 * Popper constructor with special modifiers by default
 */
export const createPopper = popperGenerator({ defaultModifiers });
