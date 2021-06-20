import { Modifier, ModifierArguments } from '@popperjs/core';

function applyMinWidthFn({ state }: ModifierArguments<{}>) {
	state.styles.popper.minWidth = `${state.rects.reference.width}px`;
}

/**
 * Modifier to set min width of popper like reference
 */
export const applyMinWidth: Modifier<'applyMinWidth', {}> = {
	name: 'applyMinWidth',
	enabled: true,
	fn: applyMinWidthFn,
	phase: 'beforeWrite',
	requires: ['computeStyles'],
};
