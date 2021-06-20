import { Modifier, ModifierArguments } from '@popperjs/core';

import { fromEntries } from '../../../../polyfills/fromEntries';
import { SetStateHook } from '../types';

export type Options = {
	setState: SetStateHook;
};

/**
 * Call hook to update styles state
 */
function updateStylesFn({
	state,
	options: { setState },
}: ModifierArguments<Options>) {
	if (setState === undefined) return;

	const elements =
		state.elements !== undefined ? Object.keys(state.elements) : [];

	// NOTE: makes a not deep copy objects from state, therefore NEVER MUTATE THIS
	setState({
		styles: fromEntries(
			elements.map((element) => [element, state.styles[element] || {}]),
		),
		attributes: fromEntries(
			elements.map((element) => [
				element,
				state.attributes[element] || {},
			]),
		),
	});
}

/**
 * Modifier that call user hook to update styles while change position
 */
export const updateStyles: Modifier<'updateStyles', Options> = {
	name: 'updateStyles',
	enabled: true,
	fn: updateStylesFn,
	phase: 'write',
	requires: ['computeStyles'],
};
