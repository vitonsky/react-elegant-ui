import type { Meta, StoryObj } from '@storybook/react';

import {
	IMenuProps,
	Menu,
	MenuMixedItem,
} from '@package/components/Menu/Menu.bundle/desktop';
import { theme } from '@package/theme/presets/default';
import { cnTheme } from '@package/theme';
import React, { useEffect, useState } from 'react';

export const MenuWithState = (props: IMenuProps) => {
	const [value, setValue] = useState(props.value);
	const [isFocused, setFocus] = useState(false);
	const [cursorIdRef, cursorIdRefSet] = useState<string | null>();

	useEffect(() => {
		setValue(props.value);
	}, [props.value]);

	console.log('DBG', { props, value });

	return (
		<Menu
			aria-activedescendant={
				!isFocused ? undefined : cursorIdRef ?? undefined
			}
			cursorIdRef={cursorIdRefSet}
			{...props}
			value={value}
			setValue={setValue}
			isFocused={isFocused}
			onFocus={() => setFocus(true)}
			onBlur={() => setFocus(false)}
			tabIndex={0}
			style={{ width: 'max-content' }}
		/>
	);
};

export const demoList: MenuMixedItem[] = [
	{ id: 'apple', content: 'Apple', disabled: true },
	{ id: 'banana', content: 'Banana' },
	{ id: 'meat', content: 'Meat' },
	{ id: 'hidden', content: 'Hidden value', hidden: true },
	{
		title: 'Group name',
		items: [
			{ id: 'sosage', content: 'Sosage', disabled: true },
			{ id: 'butter', content: 'Butter', disabled: true },
			{ id: 'bread', content: 'Bread' },
		],
	},
	{ id: 'milk', content: 'Milk', disabled: true },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Examples/Menu',
	component: MenuWithState,
	decorators: (Component) => (
		<div className={cnTheme(theme)}>
			<Component />
		</div>
	),
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	args: {
		view: 'default',
		size: 'm',
		items: demoList,
	},
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		view: {
			control: 'select',
			options: ['default', 'action'],
		},
		size: {
			control: 'select',
			options: ['l', 'm', 's'],
		},
		type: {
			control: 'select',
			options: ['checkbox', 'radio'],
		},
		value: {
			control: 'object',
		},
	},
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Sample: Story = {};
export const Radio: Story = {
	args: {
		type: 'radio',
		value: 'banana',
	},
};
export const Checkbox: Story = {
	args: {
		type: 'checkbox',
		value: ['apple', 'banana'],
	},
};
