// Imported from yandex-ui. Source: https://github.com/bem/yandex-ui/

import {
	detectOverflow,
	Boundary,
	Modifier,
	ModifierArguments,
	Offsets,
	Rect,
	SideObject,
} from '@popperjs/core';

import { top, bottom, left, right } from '../utils';

export type HideOptions = {
	boundary?: Boundary;
};

export type HideModifier = Modifier<'hide', HideOptions>;

function getSideOffsets(
	overflow: SideObject,
	rect: Rect,
	preventedOffsets: Offsets = { x: 0, y: 0 },
): SideObject {
	return {
		top: overflow.top - rect.height - preventedOffsets.y,
		right: overflow.right - rect.width + preventedOffsets.x,
		bottom: overflow.bottom - rect.height + preventedOffsets.y,
		left: overflow.left - rect.width - preventedOffsets.x,
	};
}

function isAnySideFullyClipped(overflow: SideObject): boolean {
	return ([top, right, bottom, left] as const).some(
		(side) => overflow[side] >= 0,
	);
}

/**
 * Use it such as default modifier "hide" is not support some option for specify boundary
 *
 * This can be replace to default implementation in the future if it will support `boundary` option
 * Original issue: https://github.com/popperjs/popper-core/issues/1252
 */
function hideFn({ state, name, options }: ModifierArguments<HideOptions>) {
	const { boundary } = options;
	const referenceRect = state.rects.reference;
	const popperRect = state.rects.popper;
	const preventedOffsets = state.modifiersData.preventOverflow;

	const referenceOverflow = detectOverflow(state, {
		elementContext: 'reference',
		boundary,
	});
	const popperAltOverflow = detectOverflow(state, {
		altBoundary: true,
		boundary,
	});

	const referenceClippingOffsets = getSideOffsets(
		referenceOverflow,
		referenceRect,
	);
	const popperEscapeOffsets = getSideOffsets(
		popperAltOverflow,
		popperRect,
		preventedOffsets,
	);

	const isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	const hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);

	state.modifiersData[name] = {
		referenceClippingOffsets,
		popperEscapeOffsets,
		isReferenceHidden,
		hasPopperEscaped,
	};

	state.attributes.popper = {
		...state.attributes.popper,
		'data-popper-reference-hidden': isReferenceHidden,
		'data-popper-escaped': hasPopperEscaped,
	};
}

/**
 * Modifier to hide popup when reference or popup is out of viewport
 */
export const hide: HideModifier = {
	name: 'hide',
	enabled: true,
	phase: 'main',
	requiresIfExists: ['preventOverflow'],
	fn: hideFn,
};
