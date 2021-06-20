// Imported from yandex-ui. Source: https://github.com/bem/yandex-ui/

import { Modifier, ModifierArguments } from '@popperjs/core';

function hasTransformScale(element: HTMLElement): boolean {
	return window.getComputedStyle(element).transform.indexOf('matrix') !== -1;
}

export type Options = {
	delay: number;
};

function patchScaleFactorFn({
	state,
	instance,
	options,
}: ModifierArguments<Options>) {
	const { reference } = state.elements;
	const { delay = 200 } = options;

	if (!(instance as any).__patchedScaleFactor) {
		(instance as any).__patchedScaleFactor = true;
		// Force update only if reference is have transforms
		if (reference instanceof HTMLElement && hasTransformScale(reference)) {
			// Update after delay to await end of animations
			setTimeout(() => instance.update(), delay);
		}
	}
}

/**
 * Modifier to correction a position of reference with consider a transforms
 */
export const patchScaleFactor: Modifier<'patchScaleFactor', Options> = {
	name: 'patchScaleFactor',
	enabled: true,
	fn: patchScaleFactorFn,
	phase: 'beforeRead',
	requires: ['popperOffsets'],
};
