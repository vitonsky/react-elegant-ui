import React, {
	FC,
	Ref,
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from 'react';
import { VirtualElement } from '@popperjs/core';

import { withHOCConstructor } from '../../../lib/compose';
import { filterObject } from '../../../lib/filterObject';
import { mergeRefsAsCallback } from '../../../lib/mergeRefs';
import { getDisplayName } from '../../../lib/getDisplayName';

import {
	PopperAnyModifiers,
	Direction,
	Boundary,
	usePopper,
	directions,
} from '../../../hooks/behavior/usePopper';
import { useLiveRef } from '../../../hooks/useLiveRef';
import { useMergeContext } from '../../../hooks/useMergeContext';
import { useEqualMemo } from '../../../hooks/useEqualMemo';
import { useRefHost } from '../../../hooks/useRefHost';

import { IPopupProps } from '../Popup';
import { TailContext } from '../Tail/Popup-Tail';

export interface IModPopupTargetAnchor {
	/**
	 * Position popup relative of element specified as `anchor`
	 */
	target?: 'anchor';

	/**
	 * Element relative to which the popup will be positioned
	 */
	anchor?: RefObject<HTMLElement | VirtualElement>;

	/**
	 * Ref to elements where popup should fit
	 */
	boundary?: Boundary;

	/**
	 * Direction of popup relative a target.
	 *
	 * One direction or directions list ordered by priority
	 *
	 * @default ['bottom-start', 'bottom', 'bottom-end',
	 * 'top-start', 'top', 'top-end', 'right-start',
	 * 'right', 'right-end', 'left-start', 'left', 'left-end']
	 */
	direction?: Direction | Direction[];

	/**
	 * Modifiers for popperjs
	 */
	modifiers?: PopperAnyModifiers;

	/**
	 * Pin a popup position after open
	 */
	motionless?: boolean;

	/**
	 * Popup indent for main direction
	 *
	 * @default 0
	 */
	mainOffset?: number;

	/**
	 * Popup indent for secondary direction
	 *
	 * @default 0
	 */
	secondaryOffset?: number;

	/**
	 * Offset of tail from popup edge
	 *
	 * @default 0
	 */
	tailOffset?: number;

	/**
	 * Offset from the viewport edge
	 *
	 * @default 16
	 */
	viewportOffset?: number;

	/**
	 * Ref with hook for force update position
	 */
	UNSTABLE_updatePosition?: Ref<() => void>;
}

/**
 * Mod to set position relative of element specified as `anchor`
 * @param {IModPopupTargetAnchor} props
 */
export const withModPopupTargetAnchor = withHOCConstructor<
	IModPopupTargetAnchor,
	IPopupProps
>(
	{
		matchProps: { target: 'anchor' },
		privateProps: [
			'anchor',
			'boundary',
			'direction',
			'mainOffset',
			'modifiers',
			'motionless',
			'secondaryOffset',
			'tailOffset',
			'target',
			'viewportOffset',
		],
	},
	(Popup) => {
		const WithTargetAnchor: FC<IModPopupTargetAnchor & IPopupProps> = (
			props,
		) => {
			const {
				anchor,
				direction = directions,
				hasTail,
				mainOffset = hasTail ? 0 : 4,
				modifiers,
				motionless,
				secondaryOffset,
				style,
				tailOffset,
				target,
				viewportOffset,
				visible = false,
				innerRef,
				tailRef,
				boundary,
				UNSTABLE_updatePosition,
				...otherProps
			} = props;

			// It's fatal error
			if (anchor === undefined) {
				throw Error('anchor is undefined');
			}

			const [popupRef, setPopupRef] = useLiveRef<HTMLElement>(null);
			const [arrowRef, setArrowRef] = useLiveRef<HTMLElement>(null);

			const {
				styles = {},
				attributes = {},
				popper,
			} = usePopper({
				anchorRef: anchor,
				popupRef,
				arrowRef,
				boundary,
				children: otherProps.children,
				placement: direction,
				motionless,
				enabled: visible,
				marginThreshold: viewportOffset,
				modifiers,
				offset: [secondaryOffset, mainOffset],
				UNSAFE_tailOffset: tailOffset,
			});

			const updatePosition = useCallback(() => {
				if (popper === null) return;

				popper.update();
			}, [popper]);

			useRefHost(UNSTABLE_updatePosition, updatePosition);

			const innerRefMix = useMemo(
				() => mergeRefsAsCallback(setPopupRef, innerRef),
				[setPopupRef, innerRef],
			);

			const tailRefMix = useMemo(
				() => mergeRefsAsCallback(setArrowRef, tailRef),
				[setArrowRef, tailRef],
			);

			const popperAttributes = useEqualMemo(
				() =>
					filterObject(
						attributes.popper || {},
						(value) => value !== false,
					),
				[attributes.popper],
			);

			const tailContextCache = useEqualMemo(
				() => ({
					style: styles.arrow,
				}),
				[styles.arrow],
			);

			const tailContextValue = useMergeContext(
				TailContext,
				tailContextCache,
			);

			// Update anchor ref. Clear, when it is not instance of `HTMLElement`
			// It need to support virtual anchor for "popperjs"
			const anchorRef = useRef<HTMLElement | null>(null);
			useEffect(() => {
				anchorRef.current =
					anchor.current instanceof HTMLElement
						? anchor.current
						: null;
			}, [anchor]);

			return (
				<TailContext.Provider value={tailContextValue}>
					<Popup
						{...popperAttributes}
						{...otherProps}
						hasTail={hasTail}
						innerRef={innerRefMix}
						style={{ ...style, ...styles.popper }}
						tailRef={tailRefMix}
						essentialRefs={[anchorRef]}
						visible={visible}
					/>
				</TailContext.Provider>
			);
		};

		WithTargetAnchor.displayName = `withTargetAnchor(${getDisplayName(
			Popup,
		)})`;

		return WithTargetAnchor;
	},
);
