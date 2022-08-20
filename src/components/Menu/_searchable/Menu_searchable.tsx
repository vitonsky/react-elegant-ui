import React, { useEffect, useMemo, useState } from 'react';
import { useComponentRegistry } from '../../../lib/di';

import { SimplyHOC } from '../../../lib/compose';

import { ITextinputControl } from '../../Textinput/Control/Textinput-Control';

import {
	IMenuProps,
	getTextOfItem,
	MenuMixedItem,
	MenuGroup,
	MenuItem,
	isGroup,
	cnMenu,
} from '../Menu';
import '../Search/Menu-Search.css';

import { IMenuSearchRegistry } from '../Menu.registry/features';
import { IInlineSearchProps } from '../Menu.hocs/withInlineSearch';

export type Predicate = (text: string, search: string) => boolean;

export const defaultPredicate = (text: string, search: string) => {
	const lowerText = text.toLowerCase();
	const lowerSearch = search.toLowerCase();

	return lowerText.search(lowerSearch) !== -1;
};

/**
 * Return deep copy of `items` object where hidden a not match items
 */
export const applySearchFilter = (
	searchText: string,
	predicate: Predicate,
	items: MenuMixedItem[],
) => {
	const innerSearch = (items: MenuMixedItem[]) => {
		const handledItems: MenuMixedItem[] = [];
		let isEmpthy = true;

		for (const currentItem of items) {
			if (isGroup(currentItem)) {
				const group: MenuGroup = { ...currentItem };

				const [handledItemsNested, isEmpthyNested] = innerSearch(
					group.items,
				);

				group.items = handledItemsNested;
				group.hidden =
					group.hidden || isEmpthyNested || group.items.length === 0;

				if (!group.hidden) {
					isEmpthy = false;
				}

				handledItems.push(group);
			} else {
				const item: MenuItem = { ...currentItem };

				if (!item.hidden && searchText.length > 0) {
					const text = getTextOfItem(item);
					item.hidden = !predicate(text, searchText);
				}

				if (!item.hidden) {
					isEmpthy = false;
				}

				handledItems.push(item);
			}
		}

		return [handledItems, isEmpthy] as const;
	};

	return innerSearch(items)[0];
};

export interface IModMenuSearchable {
	/**
	 * Enable search input for menu
	 */
	searchable?: boolean;

	/**
	 * Placeholder for search input
	 */
	searchPlaceholder?: string;

	/**
	 * Predicate which test text from search input with items text
	 * and decide should be item show
	 */
	searchPredicate?: Predicate;

	/**
	 * Ref to input
	 */
	searchRef?: ITextinputControl['innerRef'];
}

/**
 * Mod to add search input
 *
 * WARNING: if you use it with `withInlineSearch`, this modifier should wrap `withInlineSearch`
 * to prevent inline search while search here
 */
export const withModMenuSearchable: SimplyHOC<IModMenuSearchable, IMenuProps> =
	(Menu) =>
		({
			searchable,
			searchPlaceholder,
			searchPredicate,
			searchRef,

			items,
			addonBefore,
			...props
		}) => {
			const [searchInput, setSearchInput] = useState('');

			const isMatch = searchPredicate ?? defaultPredicate;

			const renderItems = useMemo(
				() =>
					searchInput.length === 0
						? items
						: applySearchFilter(searchInput, isMatch, items),
				[searchInput, isMatch, items],
			);

			const [isDisabledInlineSearch, setIsDisabledInlineSearch] =
			useState(false);

			// Remove a force disable `inlineSearch` when `searchable` toggle off
			useEffect(() => setIsDisabledInlineSearch(false), [searchable]);

			const { SearchInput } = useComponentRegistry<IMenuSearchRegistry>(
				cnMenu(),
			);

			// TODO: improve "aria" props to menu with search. Must be role like search input + menu with active item
			// Memoize a input render
			const addonBeforeContent = useMemo(
				() =>
					!searchable ? (
						addonBefore
					) : (
						<>
							{addonBefore}
							<SearchInput
								innerRef={searchRef}
								placeholder={searchPlaceholder}
								value={searchInput}
								onChange={({ target }) =>
									setSearchInput(target.value)
								}
								onClear={() => setSearchInput('')}
								onFocus={() => setIsDisabledInlineSearch(true)}
								onBlur={() => setIsDisabledInlineSearch(false)}
							/>
						</>
					),
				[
					SearchInput,
					searchable,
					addonBefore,
					searchRef,
					searchPlaceholder,
					searchInput,
				],
			);

			const specialProps: Record<string, any> = {};

			// Disable inline search while focus on search input
			const inlineSearchState = (props as IInlineSearchProps).inlineSearch;
			if (inlineSearchState !== undefined) {
				specialProps.inlineSearch =
				inlineSearchState && !isDisabledInlineSearch;
			}

			return (
				<Menu
					{...(props as any)}
					{...specialProps}
					items={renderItems}
					addonBefore={addonBeforeContent}
				/>
			);
		};
