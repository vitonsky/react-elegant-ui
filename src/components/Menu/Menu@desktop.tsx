import React, { ComponentType, FC, useCallback, useMemo } from 'react';

import { KeyCodesList, Keys } from '../../lib/keyboard';
import { getDisplayName } from '../../lib/getDisplayName';
import { useKeyboardNavigation } from '../../hooks/behavior/useKeyboardNavigation';
import {
	KeyboardPickParameters,
	useKeyboardPick,
} from '../../hooks/behavior/useKeyboardPick';

import {
	IMenuProps,
	Menu as BaseMenu,
	MenuItem,
	flattenItemsWithoutEmptyGroups,
	isAvailableItem,
} from './Menu';

export * from './Menu';

export interface IMenuDesktopProps
	extends IMenuProps,
		Pick<KeyboardPickParameters, 'pickKeys' | 'pickStrategy'> {
	/**
	 * Key codes which will trigger `onPick` event
	 *
	 * By default `[Keys.ENTER, Keys.SPACE]`
	 */
	pickKeys?: KeyCodesList;
}

export const withMenuDesktop =
	(BaseMenu: ComponentType<IMenuProps>): FC<IMenuDesktopProps> =>
		({
			pickKeys = [Keys.ENTER, Keys.SPACE],
			pickStrategy = 'keydown',
			...props
		}) => {
			const {
				disabled,
				isFocused,
				items,
				cursorIndex,
				setCursorIndex,
				onPick,
			} = props;

			const flatItems: MenuItem[] = useMemo(
				() => flattenItemsWithoutEmptyGroups(items),
				[items],
			);

			const enabled = !disabled && !!isFocused;
			const cursor = cursorIndex ?? -1;

			const onPickProxy = useCallback(() => {
				const item = flatItems[cursor];
				if (item !== undefined && onPick !== undefined) {
					onPick(item.id, cursor);
				}
			}, [flatItems, cursor, onPick]);

			// Add keyboard pick
			useKeyboardPick({
				enabled,
				pickKeys,
				pickStrategy,
				onPick: onPickProxy,
			});

			// Add keyboard navigation
			useKeyboardNavigation({
				enabled,
				items: flatItems,
				cursor: cursorIndex ?? -1,
				setCursor: setCursorIndex,
				predicate: isAvailableItem,
				direction: ['vertical'],
				enableJump: true,
				loop: true,
			});

			return <BaseMenu {...props} />;
		};

export const Menu: FC<IMenuDesktopProps> = withMenuDesktop(BaseMenu);

Menu.displayName = getDisplayName(BaseMenu);
