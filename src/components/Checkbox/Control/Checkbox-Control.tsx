import React, { FC, InputHTMLAttributes } from 'react';

import { IComponentElement } from '../../../types/IComponent';

import { cnCheckbox } from '../Checkbox';

import './Checkbox-Control.css';

export interface ICheckboxControl<T = HTMLInputElement>
	extends IComponentElement<T>,
		InputHTMLAttributes<T> {}

export const CheckboxControl: FC<ICheckboxControl> = ({
	innerRef,
	className,
	children,
	...props
}) => (
	<input
		{...props}
		ref={innerRef}
		type="checkbox"
		className={cnCheckbox('Control', [className])}
	/>
);
