import React, { useEffect, useMemo } from 'react';
import { useComponentRegistry } from '@bem-react/di';

import { withHOCConstructor } from '../../../lib/compose';
import { findIndexLoop } from '../../../lib/findIndexLoop';

import {
	cnMenu,
	flattenItemsWithoutEmptyGroups,
	getTextOfItem,
	IMenuProps,
	isAvailableItem,
	isGroup,
	MenuItem,
	MenuMixedItem,
} from '../Menu';

import { IMenuSelectedItemRegistry } from '../Menu.registry/features';

export interface IModMenuTypeCheckbox {
	type?: 'checkbox';
	value?: string[];
	setValue?: (value: this['value']) => void;
}

/**
 * Helper to wrap items
 */
export const wrapItems = (
	registry: IMenuSelectedItemRegistry,
	items: MenuMixedItem[],
	value?: string[],
): MenuMixedItem[] => {
	const { ItemContent, ItemTick } = registry;

	return items.map((item) => {
		if (isGroup(item)) {
			const { items, ...other } = item;
			return { items: wrapItems(registry, items, value), ...other };
		}

		const { content, id, addonProps, raw, ...other } = item;
		const isChecked = id && value && value.indexOf(id) > -1;
		const modifiedItem: MenuItem = {
			...other,
			id,
			addonProps: {
				['aria-selected']: isChecked ? true : false,
				...addonProps,
			},
			raw: true,
			textContent: getTextOfItem(item),
			content: (
				<ItemContent
					raw={raw}
					addonBefore={<ItemTick checked={!!isChecked} />}
				>
					{content}
				</ItemContent>
			),
		};
		return modifiedItem;
	});
};

/**
 * Mod to add checkbox behavior
 */
export const withModMenuTypeCheckbox = withHOCConstructor<
	IModMenuTypeCheckbox,
	IMenuProps
>(
	{
		matchProps: { type: 'checkbox' },
		privateProps: ['type', 'value', 'setValue'],
	},
	(Menu) => ({
		type,
		items,
		isFocused,
		onPick,
		value,
		setValue,
		cursorIndex,
		setCursorIndex,
		...props
	}) => {
		const componentsRegistry = useComponentRegistry<IMenuSelectedItemRegistry>(
			cnMenu(),
		);

		const wrappedItems = useMemo(
			() => wrapItems(componentsRegistry, items, value),
			[componentsRegistry, items, value],
		);

		// Focus cursor on selected element
		useEffect(() => {
			if (
				isFocused &&
				setCursorIndex !== undefined &&
				(cursorIndex === undefined || cursorIndex === -1) &&
				value
			) {
				const selectedItemIndex = findIndexLoop(
					flattenItemsWithoutEmptyGroups(items),
					(item) =>
						isAvailableItem(item) &&
						value.length > 0 &&
						value.indexOf(item.id) > -1,
				);

				if (selectedItemIndex !== -1) {
					setCursorIndex(selectedItemIndex);
				}
			}
			// need execute this only by change isFocused
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [isFocused]);

		return (
			<Menu
				{...props}
				{...{
					cursorIndex,
					setCursorIndex,
					isFocused,
				}}
				aria-multiselectable
				items={wrappedItems}
				onPick={(id, idx) => {
					if (onPick !== undefined) {
						onPick(id, idx);
					}

					if (setValue !== undefined) {
						if (value === undefined || value.length === 0) {
							setValue([id]);
							return;
						}

						const filtred = value.filter(
							(localId) => localId !== id,
						);
						setValue(
							filtred.length !== value.length
								? filtred
								: filtred.concat(id),
						);
					}
				}}
			/>
		);
	},
);
