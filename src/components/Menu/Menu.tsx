import React, {
	FC,
	HTMLAttributes,
	ReactNode,
	Ref,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from 'react';
import { cn } from '@bem-react/classname';
import { useComponentRegistry } from '../../lib/di';

import {
	IComponentHTMLElement,
	IComponentWithAddonNodes,
} from '../../types/IComponent';
import { mergeRefsAsCallback } from '../../lib/mergeRefs';
import { flatMap } from '../../lib/flatMap';
import { setRefValue } from '../../lib/setRefValue';
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';

import { IMenuRegistry } from './Menu.registry';
import './Menu.css';

export type MenuItem = {
	/**
	 * Value of item
	 */
	id: string;

	/**
	 * Disable state of item
	 */
	disabled?: boolean;

	/**
	 * It's work as `disabled`, but also don't show item
	 */
	hidden?: boolean;

	raw?: boolean;

	addonProps?: HTMLAttributes<HTMLElement>;
} & (
	| {
			/**
			 * Text content of item
			 */
			content: string;
	  }
	| {
			/**
			 * Complexity content of item
			 */
			content: ReactNode;

			/**
			 * Text content of item
			 *
			 * It used for present for user
			 */
			textContent: string;
	  }
);

export type MenuGroup = {
	/**
	 * Title of group
	 */
	title?: string;

	/**
	 * Item list
	 */
	items: (MenuItem | MenuGroup)[];

	/**
	 * Don't show group
	 */
	hidden?: boolean;
};

export type MenuMixedItem = MenuItem | MenuGroup;

// NOTE: #proposal add prop `autoCursorControl` which define behavior for reset cursor by unfocus and similar causes
// by default it enabled but can be disable for specific cases when after unfocus cursor must be keep out.
export interface IMenuProps<T extends HTMLElement = HTMLDivElement>
	extends IComponentHTMLElement<T>,
		IComponentWithAddonNodes {
	/**
	 * Item list
	 */
	items: MenuMixedItem[];

	/**
	 * Handler for item pick
	 */
	onPick?: (id: string, index: number) => void;

	disabled?: boolean;

	/**
	 * Define render hidden items with mod `hidden` or ignore
	 */
	isRenderHidden?: boolean;

	/**
	 * Menu navigation is active by focuse
	 */
	isFocused?: boolean;

	/**
	 * Hook for update `isFocused`
	 */
	setFocus?: (isFocused: boolean) => void;

	/**
	 * Absolute index of focused item
	 *
	 * Under absolute meaning index from flatten item list
	 */
	cursorIndex?: number;

	/**
	 * Hook for update `cursorIndex`
	 */
	setCursorIndex?: (index: number) => void;

	/**
	 * Ref to hovered item
	 */
	cursorRef?: Ref<T>;

	/**
	 * Ref to hovered item id attribute
	 *
	 * It useful to use in "aria" attributes, for example in `aria-activedescendant`
	 */
	cursorIdRef?: Ref<string | null>;
}

export const isGroup = (item: MenuMixedItem): item is MenuGroup =>
	'items' in item;

export const getTextOfItem = (item: MenuItem): string =>
	'textContent' in item ? item.textContent : item.content;

export const isAvailableItem = (item?: MenuItem): item is MenuItem =>
	item !== undefined && !item.disabled && !item.hidden;

/**
 * Return flat item array
 * @param isRemoveHiddenGroups while `true` ignore items from hidden groups
 */
export const flattenItems = (
	items: readonly MenuMixedItem[],
	isRemoveHiddenGroups = false,
): MenuItem[] => {
	return flatMap<MenuMixedItem, MenuItem>(
		items as MenuMixedItem[],
		(item) => {
			if (!isGroup(item)) {
				return item;
			}

			return item.hidden && isRemoveHiddenGroups
				? []
				: flattenItems(item.items);
		},
	);
};

/**
 * Return flat item array without items from hidden groups
 */
export const flattenItemsWithoutEmptyGroups = (
	items: readonly MenuMixedItem[],
) => flattenItems(items, true);

const counter =
	(init = 0) =>
		() =>
			init++;

export const cnMenu = cn('Menu');

export const Menu: FC<IMenuProps> = ({
	className,
	items,
	disabled,
	isRenderHidden,
	isFocused,
	setFocus,
	cursorIndex,
	setCursorIndex,
	onPick,
	innerRef,
	cursorRef: cursorRefExternal,
	cursorIdRef: cursorIdRefExternal,
	addonBefore,
	addonAfter,
	...props
}) => {
	const menuRef = useRef<HTMLDivElement>(null);
	const cursorRef = useRef<HTMLDivElement>(null);

	const flatItems: MenuItem[] = useMemo(
		() => flattenItemsWithoutEmptyGroups(items),
		[items],
	);

	/**
	 * Pick item pointed by cursor
	 */
	const pick = useCallback(() => {
		if (disabled || cursorIndex === undefined || onPick === undefined)
			return;

		const item = flatItems[cursorIndex];
		if (isAvailableItem(item)) {
			onPick(item.id, cursorIndex);
		}
	}, [disabled, cursorIndex, onPick, flatItems]);

	/**
	 * Set new cursor index
	 */
	const setupCursor = useCallback(
		(index: number) => {
			if (disabled || setCursorIndex === undefined) return;

			if (index === -1) {
				setCursorIndex(index);
			} else {
				const item = flatItems[index];
				if (isAvailableItem(item)) {
					setCursorIndex(index);
				}
			}
		},
		[disabled, setCursorIndex, flatItems],
	);

	// Scroll to cursor
	useLayoutEffect(() => {
		const scrollContainer = menuRef.current;
		const cursorElm = cursorRef.current;

		if (scrollContainer && cursorElm) {
			const itemStart = cursorElm.offsetTop - scrollContainer.offsetTop;
			const itemEnd = itemStart + cursorElm.offsetHeight;

			// If item fully fits in scrollContainer
			if (scrollContainer.clientHeight > cursorElm.offsetHeight) {
				const viewPortStart = scrollContainer.scrollTop;
				const viewPortEnd =
					viewPortStart + scrollContainer.clientHeight;

				if (viewPortStart > itemStart) {
					scrollContainer.scrollTop = itemStart;
				} else if (viewPortEnd < itemEnd) {
					scrollContainer.scrollTop =
						itemEnd - scrollContainer.clientHeight;
				}
			} else {
				scrollContainer.scrollTop = itemStart;
			}
		}
	}, [cursorIndex]);

	// Control cursor by focus
	useEffect(() => {
		if (isFocused) {
			// Find and set cursor
			if (cursorIndex === undefined || cursorIndex === -1) {
				const cursor = flatItems.findIndex(isAvailableItem);
				setupCursor(cursor);
			}
		} else {
			// Reset cursor
			setupCursor(-1);
		}
		// must update only by change `isFocused`
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFocused]);

	const setItemHover = (hovered: boolean, index?: number) => () => {
		setupCursor(hovered && index !== undefined ? index : -1);
	};

	// Keep actual `cursorIdRefExternal` value
	const refToCursorIdRef = useRef<typeof cursorIdRefExternal>();
	refToCursorIdRef.current = cursorIdRefExternal;

	// Clean `cursorIdRefExternal` with unmount
	useEffect(
		() => () => {
			if (refToCursorIdRef.current === undefined) return;

			setRefValue(refToCursorIdRef.current, null);
		},
		[],
	);

	const cursorIdRef = useRef<string>(null);

	// Update `cursorIdRefExternal`
	useEffect(() => {
		// Skip empty ref
		if (cursorIdRefExternal === undefined) return;

		// Clean when cursor is not exist
		if (cursorIndex === -1) {
			setRefValue(cursorIdRefExternal, null);
			return;
		}

		const id = cursorIdRef?.current ?? null;
		setRefValue(cursorIdRefExternal, id);
	}, [cursorIdRefExternal, cursorIdRef, cursorIndex, items]);

	const renderItems =
		(
			{ Group, Item }: Pick<IMenuRegistry, 'Group' | 'Item'>,
			itemIndexCounter: () => number,
			keyIndexCounter: () => number,
			isHiddenAll = false,
		) =>
			(item: MenuMixedItem) => {
				const keyIndex = keyIndexCounter();

				if (isGroup(item)) {
					const isHidden = item.hidden || isHiddenAll;

					return isHidden && !isRenderHidden ? undefined : (
						<Group title={item.title} key={keyIndex} hidden={isHidden}>
							{item.items.map(
								renderItems(
									{ Group, Item },
									itemIndexCounter,
									keyIndexCounter,
									isHidden,
								),
							)}
						</Group>
					);
				}

				const itemIndex = itemIndexCounter();
				const isCurrentCursor =
				cursorIndex !== undefined && cursorIndex === itemIndex;

				const isDisabled = item.disabled || disabled;
				const isHidden = item.hidden || isHiddenAll;

				return isHidden && !isRenderHidden ? undefined : (
					<Item
						idRef={isCurrentCursor ? cursorIdRef : undefined}
						raw={item.raw}
						addonProps={item.addonProps}
						key={keyIndex}
						disabled={isDisabled}
						hidden={isHidden}
						cursor={isCurrentCursor}
						innerRef={
							isCurrentCursor
								? mergeRefsAsCallback(cursorRef, cursorRefExternal)
								: undefined
						}
						onMouseEnter={setItemHover(true, itemIndex)}
						onMouseLeave={setItemHover(false)}
						onClick={isAvailableItem(item) ? pick : undefined}
					>
						{item.content}
					</Item>
				);
			};

	const itemIndexCounter = counter();
	const keyIndexCounter = counter();

	const { Container, Group, Item } = useComponentRegistry<IMenuRegistry>(
		cnMenu(),
	);

	return (
		<div
			role="listbox"
			aria-disabled={disabled}
			{...props}
			ref={mergeRefsAsCallback(menuRef, innerRef)}
			className={cnMenu({ disabled, focused: isFocused }, [className])}
		>
			{addonBefore}
			<Container>
				{items.map(
					renderItems(
						{ Group, Item },
						itemIndexCounter,
						keyIndexCounter,
					),
				)}
			</Container>
			{addonAfter}
		</div>
	);
};

Menu.displayName = cnMenu();
