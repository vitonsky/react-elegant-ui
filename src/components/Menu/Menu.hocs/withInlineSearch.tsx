import React, { useMemo } from 'react';

import { withHOCConstructor } from '../../../lib/compose';
import { useInlineKeyboardSearch } from '../../../hooks/behavior/useInlineKeyboardSearch';

import {
	getTextOfItem,
	flattenItemsWithoutEmptyGroups,
	IMenuProps,
	isAvailableItem,
	MenuItem,
} from '../Menu';

const defaultPredicate = (searchText: string, item: MenuItem) => {
	// Skip disabled and hidden items
	if (!isAvailableItem(item)) return false;

	const itemText = getTextOfItem(item);

	// Skip items which not contain text
	if (itemText === undefined) return false;

	const substr = itemText.slice(0, searchText.length);

	return substr.toLowerCase() === searchText.toLowerCase();
};

export interface IInlineSearchProps {
	inlineSearch?: boolean;
	inlineSearchPredicate?: (searchText: string, item: MenuItem) => boolean;
}

/**
 * HOC to search items by input while focus.
 *
 * It search by item text, that may be `content` or `textContent`
 */
export const withInlineSearch = withHOCConstructor<
	IInlineSearchProps,
	IMenuProps
>({}, (Menu) => ({ inlineSearch, inlineSearchPredicate, ...props }) => {
	const { items, cursorIndex, setCursorIndex, isFocused, disabled } = props;

	const flattenItems = useMemo(() => flattenItemsWithoutEmptyGroups(items), [
		items,
	]);

	const enableInlineSearch = !disabled && !!inlineSearch && !!isFocused;
	const searchPredicate = inlineSearchPredicate || defaultPredicate;

	useInlineKeyboardSearch({
		enabled: enableInlineSearch,
		items: flattenItems,
		cursor: cursorIndex ?? -1,
		setCursor: setCursorIndex,
		predicate: searchPredicate,
		loop: true,
	});

	return <Menu {...props} />;
});
