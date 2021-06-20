import React, { FC } from 'react';

import { IComponentHTMLElement } from '../../../types/IComponent';

import { cnButton } from '../Button';
import './Button-Text.css';

export interface IButtonText extends IComponentHTMLElement<HTMLElement> {}

export const ButtonText: FC<IButtonText> = ({
	className,
	children,
	innerRef,
	...props
}) => (
	<span
		{...props}
		ref={innerRef}
		className={cnButton('Text', null, [className])}
	>
		{children}
	</span>
);
