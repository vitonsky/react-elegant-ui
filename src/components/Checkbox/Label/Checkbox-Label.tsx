import React, { FC } from 'react';

import { IComponentHTMLElement } from '../../../types/IComponent';

import { cnCheckbox } from '../Checkbox';

import './Checkbox-Label.css';

export interface ICheckboxLabel
	extends IComponentHTMLElement<HTMLLabelElement> {
	/**
	 * Interface for html property `for`
	 */
	target?: string;
}

export const CheckboxLabel: FC<ICheckboxLabel> = ({
	innerRef,
	target,
	className,
	children,
	...props
}) => (
	<label
		{...props}
		ref={innerRef}
		className={cnCheckbox('Label', [className])}
		htmlFor={target}
		// Add this to prevent unfocus from target
		// onMouseDown={(evt) => evt.preventDefault()}
	>
		{children}
	</label>
);
