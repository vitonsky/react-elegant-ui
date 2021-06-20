// Imported from yandex-ui. Source: https://github.com/bem/yandex-ui/

import { Modifier, ModifierArguments, Offsets } from '@popperjs/core';

import { directions } from '../directions';
import { getLayoutRect, distanceAndSkiddingToXY } from '../utils';

export type OffsetOptions = {
	offset: [number, number];
	tailOffset?: number;
};

/**
 * Use it instead default offset modifier because we need consider tail size
 * for offset and round a offset for correct alignment
 */
function offsetFn({ state, options }: ModifierArguments<OffsetOptions>) {
	const { offset = [0, 0], tailOffset } = options;

	// TODO: #bug `tailOffset` is never apply and useless
	// probably this mod unnecessary and should replace to `arrowOverflow`
	// who will prevent out arrow of popup for any cases
	if (state.modifiersData.arrow && tailOffset) {
		if (state.modifiersData.arrow.x) {
			state.modifiersData.arrow.x += tailOffset;
		}
		if (state.modifiersData.arrow.y) {
			state.modifiersData.arrow.y += tailOffset;
		}
	}

	if (state.modifiersData.popperOffsets && state.elements.arrow) {
		const { width } = getLayoutRect(state.elements.arrow);

		// Displace tail on half size, such as it should fit to square
		// to correct positioning for all directions
		const { x, y } = distanceAndSkiddingToXY(state.placement, [
			0,
			width / 2,
		]);
		state.modifiersData.popperOffsets.x += x;
		state.modifiersData.popperOffsets.y += y;
	}

	const data = directions.reduce<Record<string, Offsets>>(
		(acc, placement) => {
			acc[placement] = distanceAndSkiddingToXY(placement, offset);
			return acc;
		},
		{},
	);

	const { x, y } = data[state.placement];

	if (state.modifiersData.popperOffsets) {
		state.modifiersData.popperOffsets.x = Math.ceil(
			state.modifiersData.popperOffsets.x + x,
		);
		state.modifiersData.popperOffsets.y = Math.ceil(
			state.modifiersData.popperOffsets.y + y,
		);
	}

	// Write to use it in `detectOverflow` modifier
	state.modifiersData.offset = data;
}

/**
 * Modifier to set offsets for popup and tail
 */
export const offset: Modifier<'offset', OffsetOptions> = {
	name: 'offset',
	enabled: true,
	fn: offsetFn,
	phase: 'main',
	requires: ['popperOffsets'],
};
