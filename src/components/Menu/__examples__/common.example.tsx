import React, { useState } from 'react';
import { Icon } from '../../Icon/Icon.bundle/desktop';
import {
	Menu as MenuControl,
	IMenuProps,
	MenuMixedItem,
} from '../Menu.bundle/desktop';

const Menu = (props: IMenuProps) => {
	const [value, setValue] = useState(props.value);
	const [isFocused, setFocus] = useState(false);
	const [cursorIdRef, cursorIdRefSet] = useState<string | null>();

	return (
		<MenuControl
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

const demoList: MenuMixedItem[] = [
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

export const Base = () => (
	<Menu
		items={demoList}
		onPick={(id) => console.log(`Pick by item "${id}"`)}
	/>
);

export const WithSearch = () => (
	<Menu
		items={demoList}
		onPick={(id) => console.log(`Pick by item "${id}"`)}
		searchable
		searchPlaceholder="Search"
	/>
);

export const Complex = () => (
	<Menu
		items={[
			{
				id: 'item1',
				content: (
					<div>
						<Icon glyph="check" /> complex item #1{' '}
						<Icon glyph="close" />
					</div>
				),
				textContent: 'item 1',
			},
			{
				id: 'item2',
				content: (
					<div>
						<Icon glyph="check" /> complex item #2{' '}
						<Icon glyph="close" />
					</div>
				),
				textContent: 'item 2',
			},
			{
				id: 'item3',
				content: (
					<div>
						<Icon glyph="check" /> complex item #3{' '}
						<Icon glyph="close" />
					</div>
				),
				textContent: 'item 3',
			},
		]}
		onPick={(id) => console.log(`Pick by complex item "${id}"`)}
	/>
);

export const Radio = () => (
	<Menu items={demoList} type="radio" value={'banana'} />
);

export const Checkbox = () => (
	<Menu items={demoList} type="checkbox" value={['meat', 'sosage']} />
);

export const Disabled = () => (
	<Menu items={demoList} type="radio" value={'banana'} disabled />
);
