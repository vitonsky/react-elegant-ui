import { Placement, BasePlacement, Offsets } from '@popperjs/core';

// Don't use const from popper such as they is not export in commonjs bundle
// This make problems while testing (for example with jest)
// Original issue: https://github.com/popperjs/popper-core/issues/1259
export const top = 'top';
export const left = 'left';
export const right = 'right';
export const bottom = 'bottom';

import { Boundary } from './types';

export function getLayoutRect(element: HTMLElement) {
	return {
		x: element.offsetLeft,
		y: element.offsetTop,
		width: element.offsetWidth,
		height: element.offsetHeight,
	};
}

export default function getBasePlacement(placement: Placement) {
	return placement.split('-')[0] as BasePlacement;
}

export function distanceAndSkiddingToXY(
	placement: Placement,
	offset: [number, number],
): Offsets {
	const basePlacement = getBasePlacement(placement);
	const invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

	const skidding = offset[0] || 0;
	const distance = (offset[1] || 0) * invertDistance;

	return [left, right].indexOf(basePlacement) >= 0
		? { x: distance, y: skidding }
		: { x: skidding, y: distance };
}

export function getElementsFromRefs(
	boundary?: Boundary,
): HTMLElement[] | undefined {
	const refs = Array.isArray(boundary) ? boundary : [boundary];

	const elements = refs.reduce((acc, ref) => {
		if (ref && ref.current) {
			acc.push(ref.current);
		}

		return acc;
	}, [] as HTMLElement[]);

	return elements.length ? elements : undefined;
}
