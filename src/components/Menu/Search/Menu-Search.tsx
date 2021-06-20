import React, { FC, InputHTMLAttributes } from 'react';
import { useComponentRegistry } from '@bem-react/di';

import { isKeyCode, Keys } from '../../../lib/keyboard';

import { IComponentElement } from '../../../types/IComponent';

import { IMenuSearchRegistry } from '../Menu.registry/features';
import { cnMenu } from '../Menu';
import './Menu-Search.css';

export interface IMenuSearch
	extends IComponentElement<HTMLInputElement>,
		InputHTMLAttributes<HTMLInputElement> {
	value?: string;
	onClear?: () => void;
}

export const MenuSearch: FC<IMenuSearch> = ({
	className,
	innerRef,
	value,
	onClear,
	...props
}) => {
	const { Input } = useComponentRegistry<IMenuSearchRegistry>(cnMenu());

	return (
		<Input
			{...props}
			className={cnMenu('Search')}
			controlProps={{ innerRef }}
			value={value}
			onClearClick={onClear}
			onKeyDown={(evt) => {
				// Ignore space key in search input
				if (isKeyCode(evt.nativeEvent.code, Keys.SPACE)) {
					evt.nativeEvent.stopImmediatePropagation();
				}
			}}
		/>
	);
};
