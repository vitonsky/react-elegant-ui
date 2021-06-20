import React, { FC } from 'react';

import { IComponentHTMLElement } from '../../../types/IComponent';

import { cnCheckbox } from '../Checkbox';

import './Checkbox-Box.css';

export interface ICheckboxBox extends IComponentHTMLElement<HTMLDivElement> {}

export const CheckboxBox: FC<ICheckboxBox> = ({
	innerRef,
	className,
	children,
	...props
}) => (
	<div {...props} ref={innerRef} className={cnCheckbox('Box', [className])}>
		{children}
	</div>
);
