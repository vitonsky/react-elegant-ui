import React, { FC, Ref, useMemo } from 'react';
import { PressEvents } from '@react-types/shared';
import { useComponentRegistry } from '../../lib/di';
import { cn } from '@bem-react/classname';

import {
	IComponentWithAddonNodes,
	IComponentHTMLElement,
} from '../../types/IComponent';
import { IToggleable } from '../../types/features/IToggleable';

import {
	getTextOfItem as getTextOfOption,
	flattenItems,
	MenuMixedItem,
} from '../Menu/Menu';

import { ISelectRegistry } from './Select.registry';

import './Select.css';
import './Trigger/Select-Trigger.css';

export const cnSelect = cn('Select');

export type Option = MenuMixedItem;

export { getTextOfItem as getTextOfOption, isGroup } from '../Menu/Menu';

export interface ISelectProps
	extends IToggleable,
		IComponentHTMLElement<HTMLElement>,
		IComponentWithAddonNodes,
		PressEvents {
	options: Option[];

	/**
	 * Selected value. When set as array then mode will checkbox, otherwise radio
	 */
	value?: string | string[];

	/**
	 * Hook for set value
	 */
	setValue?: (value?: string | string[]) => void;

	/**
	 * Disabled state
	 */
	disabled?: boolean;

	/**
	 * Text who will show when selected nothing
	 */
	placeholder?: string;

	/**
	 * Reference to trigger element
	 */
	triggerRef?: Ref<HTMLElement>;
}

export const getTextOfSelectedOptions = (
	options: ISelectProps['options'],
	value: ISelectProps['value'],
	opts?: {
		separator: string;
		isRemoveHiddenItems: boolean;
		isRemoveHiddenGroups: boolean;
	},
) => {
	const {
		separator = ', ',
		isRemoveHiddenItems = false,
		isRemoveHiddenGroups = false,
	} = opts || {};

	// Convert to value array
	const values = ([] as string[]).concat(value ?? []);

	// Skip empty value
	if (values.length === 0) {
		return '';
	}

	// Collect map `value: index`
	// optimization to prevent search in array
	const valuesIndexMap: Record<string, number> = {};
	values.forEach((value, idx) => {
		valuesIndexMap[value] = idx;
	});

	// Make array with static size to prevent dynamic memory allocations
	const textsList: Array<string | undefined> = Array(values.length);

	const flattenOptions = flattenItems(options, isRemoveHiddenGroups);

	// iterate options instead values for performance with large options list
	// O(options**values) instead O(values**options) in bad case
	flattenOptions.forEach((option) => {
		// Optionally skip hidden options
		if (isRemoveHiddenItems && option.hidden) return;

		const value = option.id;
		const valueIndex = valuesIndexMap[value];

		// Skip options that is not selected
		if (valueIndex === undefined) return;

		const text = getTextOfOption(option);

		// Skip options with empty text
		if (text.length === 0) return;

		// Write option text by value index
		// it need to keep values order
		textsList[valueIndex] = text;
	});

	// Remove empty slots
	const filteredTexts = textsList.filter(
		(text) => text !== undefined,
	) as string[];

	return filteredTexts.join(separator);
};

export const defaultProps = {
	placeholder: '—',
	value: '',
};

export const Select: FC<ISelectProps> = ({
	disabled,
	opened,
	setOpened,
	value,
	setValue,
	className,
	placeholder,
	innerRef,
	triggerRef,
	addonBefore,
	addonAfter,
	options,
	...props
}) => {
	const isMultiselectable = Array.isArray(value);

	// Update value text
	const selectedOptionsText = useMemo(
		() => getTextOfSelectedOptions(options, value),
		[options, value],
	);

	const selectText =
		selectedOptionsText.length > 0 ? selectedOptionsText : placeholder;

	const { Trigger } = useComponentRegistry<ISelectRegistry>(cnSelect());

	return (
		<span
			className={cnSelect({ disabled, opened }, [className])}
			ref={innerRef}
			{...props}
		>
			{addonBefore}
			<Trigger
				tabIndex={disabled ? -1 : 0}
				disabled={disabled}
				innerRef={triggerRef}
				role="listbox"
				aria-haspopup="listbox"
				aria-label={selectText}
				aria-expanded={opened}
				aria-multiselectable={isMultiselectable}
			>
				{selectText}
			</Trigger>
			{addonAfter}
		</span>
	);
};

Select.defaultProps = defaultProps;
