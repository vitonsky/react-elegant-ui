import React, { useEffect, useState } from 'react';
import root from 'react-shadow';
import { useForceUpdate } from '../../../hooks/useForceUpdate';

import {
	Select as SelectControl,
	ISelectProps,
} from '../Select.bundle/desktop';

const Select = (props: ISelectProps) => {
	const [value, setValue] = useState(props.value);
	return <SelectControl {...props} value={value} setValue={setValue} />;
};

const demoList = [
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

export const Radio = () => (
	<Select options={demoList} value={'apple'} placeholder="Select something" />
);

export const Checkbox = () => (
	<Select
		options={demoList}
		value={['banana', 'meat']}
		placeholder="Select something"
	/>
);

export const Disabled = () => (
	<Select
		options={demoList}
		value={'banana'}
		placeholder="Select something"
		disabled
	/>
);

export const ShadowDOM = () => {
	// Wait loading page, cuz styles may be inject in runtime
	const update = useForceUpdate();
	useEffect(() => {
		window.addEventListener('load', update);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<root.div
			onKeyDown={(evt) => {
				evt.stopPropagation();
			}}
			mode="closed"
		>
			{/* Clone all styles, cuz it's just demo */}
			<div>
				{Array.from(document.styleSheets).map(({ href }, idx) => {
					return href === null ? undefined : (
						<link key={idx} href={href} rel="stylesheet" />
					);
				})}
			</div>
			<div>Component inside shadowDOM</div>
			<Radio />
		</root.div>
	);
};
