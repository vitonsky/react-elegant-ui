import { ReactNode, RefObject, useMemo, useRef, useState } from 'react';
import {
	Instance,
	Modifier,
	OptionsGeneric,
	VirtualElement,
} from '@popperjs/core';

import { isEqual } from '../../../lib/isEqual';
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../useIsomorphicLayoutEffect';
import { useForceUpdate } from '../../useForceUpdate';

import { createPopper, Modifiers } from './createPopper';
import { Direction } from './directions';
import { Boundary, PopperConstructor, PopperPublicState } from './types';
import { getElementsFromRefs } from './utils';

type OptionsObject<M = any> = Partial<OptionsGeneric<M>>;
type InnerOptions = OptionsObject<Modifiers>;

export type PopupHookProps<
	M extends Partial<Modifier<any, any>>[] = Partial<Modifier<any, any>>[]
> = {
	/**
	 * Reference to object relative to which the popup will be positioned
	 */
	anchorRef: RefObject<HTMLElement | VirtualElement>;

	/**
	 * Target for positioning
	 */
	popupRef: RefObject<HTMLElement>;

	/**
	 * Tail element
	 */
	arrowRef?: RefObject<HTMLElement>;

	/**
	 * Toggle calculation
	 */
	enabled?: boolean;

	/**
	 * Content. Changes of this will trigger force update
	 */
	children?: ReactNode;

	/**
	 * Custom popper constructor
	 */
	createPopper?: PopperConstructor;

	/**
	 * Addon modifiers
	 */
	modifiers?: M;

	/**
	 * User defined options
	 *
	 * If you use this, you must configure all modifiers yourself
	 */
	options?: OptionsGeneric<M>;

	/**
	 * Direction to open popup
	 */
	placement?: Direction | Direction[];

	/**
	 * References to DOM elements that popup should fit into
	 */
	boundary?: Boundary;

	/**
	 * Fixate the position of the popup after opening
	 */
	motionless?: boolean;

	/**
	 * Number of pixels from popup edge, beyond which tail should not out
	 */
	arrowMarginThreshold?: number;

	/**
	 * Number of pixels from popup edge, which trigger a change of direction
	 */
	marginThreshold?: number;

	/**
	 * Offsets, a skidding and distance
	 */
	offset?: [number | undefined, number | undefined];

	/**
	 * Offset of tail from main direction
	 */
	UNSAFE_tailOffset?: number;
};

export interface PopupHookResult extends PopperPublicState {
	popper: Instance | null;
}

/**
 * Use popperjs for positioning popup elements
 */
export function usePopper<
	M extends Partial<Modifier<any, any>>[] = Partial<Modifier<any, any>>[]
>(props: PopupHookProps<M>): PopupHookResult {
	const {
		createPopper: customPopperConstructor,
		options: userOptions,
		anchorRef,
		popupRef,
		arrowRef,
		enabled = true,
		placement = 'bottom',
		arrowMarginThreshold = 4,
		marginThreshold = 16,
		modifiers = [],
		motionless,
		offset,
		UNSAFE_tailOffset,
		children,
		boundary,
	} = props;

	const [state, setState] = useState<PopperPublicState>({});

	// Convert to array
	const placements = useMemo(
		() => (Array.isArray(placement) ? placement : [placement]),
		[placement],
	);

	const arrowNode = arrowRef?.current ?? null;

	const prevPopperOptions = useRef<OptionsObject | null>(null);
	const popperOptions = useMemo(() => {
		let options: OptionsObject;

		if (userOptions !== undefined) {
			// Set user options
			options = {
				...userOptions,
				modifiers: [
					...userOptions.modifiers,
					// Add hook to update state
					{
						name: 'updateStyles',
						options: { setState },
					},
				],
			};
		} else {
			const [placement, ...fallbackPlacements] = placements;
			const popperBoundary = getElementsFromRefs(boundary);

			// Build options
			options = {
				// Default placemet, other specified in flip modifier
				placement,
				modifiers: [
					{
						name: 'eventListeners',
						enabled: !motionless,
					},
					{
						name: 'extendedEventListeners',
						enabled: !motionless,
					},
					{
						name: 'autoCorrection',
					},
					{
						name: 'offset',
						options: {
							offset,
							tailOffset: UNSAFE_tailOffset,
						},
					},
					{
						name: 'computeStyles',
						options: {
							gpuAcceleration: false,
						},
					},
					{
						name: 'preventOverflow',
						options: {
							altBoundary: true,
							boundary: popperBoundary,
						},
					},
					{
						name: 'arrow',
						enabled: Boolean(arrowNode),
						options: {
							element: arrowNode,
							padding: arrowMarginThreshold,
						},
					},
					{
						name: 'flip',
						options: {
							padding: marginThreshold,
							fallbackPlacements,
							altBoundary: true,
							boundary: popperBoundary,
						},
					},
					{
						name: 'hide',
						options: {
							boundary: popperBoundary,
						},
					},
					...modifiers,
					{
						name: 'updateStyles',
						options: { setState },
					},
				],
			} as InnerOptions;
		}

		// Return previous object, to prevent re-render when not have difference
		if (isEqual(prevPopperOptions.current, options)) {
			return prevPopperOptions.current as OptionsObject;
		}

		prevPopperOptions.current = options;
		return options;
	}, [
		setState,
		userOptions,
		placements,
		offset,
		arrowNode,
		arrowMarginThreshold,
		motionless,
		marginThreshold,
		UNSAFE_tailOffset,
		modifiers,
		boundary,
	]);

	const forceUpdate = useForceUpdate();
	const popperRef = useRef<Instance | null>(null);
	const anchorNode = anchorRef.current;
	const popupNode = popupRef.current;

	// Create popper
	useLayoutEffect(() => {
		forceUpdate();

		if (anchorNode === null || popupNode === null || !enabled) {
			return;
		}

		const popperConstructor = customPopperConstructor || createPopper;
		const popperInstance = popperConstructor(
			anchorNode,
			popupNode,
			popperOptions,
		);

		popperRef.current = popperInstance;

		return () => {
			popperInstance.destroy();
			popperRef.current = null;
		};
		// Separately update a options instead create new instance while update
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [anchorNode, popupNode, enabled, customPopperConstructor]);

	// Apply new options
	useLayoutEffect(() => {
		if (popperRef.current !== null) {
			popperRef.current.setOptions(popperOptions);
		}
	}, [popperOptions]);

	// Update when content changes
	useLayoutEffect(() => {
		if (popperRef.current !== null) {
			popperRef.current.forceUpdate();
		}
	}, [children]);

	return {
		popper: popperRef.current,
		attributes: state.attributes,
		styles: state.styles,
	};
}
