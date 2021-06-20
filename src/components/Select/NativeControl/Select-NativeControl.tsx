import React, { FC, SelectHTMLAttributes } from 'react';

import { IComponentElement } from '../../../types/IComponent';

import { cnSelect } from '../Select';
import './Select-NativeControl.css';

export interface ISelectNativeControl<T = HTMLSelectElement>
	extends IComponentElement<T>,
		SelectHTMLAttributes<T> {}

export const SelectNativeControl: FC<ISelectNativeControl> = ({
	children,
	innerRef,
	className,
	...props
}) => (
	<select
		{...props}
		ref={innerRef}
		className={cnSelect('NativeControl', [className])}
	>
		{children}
	</select>
);
