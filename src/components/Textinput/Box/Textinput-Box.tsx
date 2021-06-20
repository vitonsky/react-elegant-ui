import React, { FC } from 'react';

import { IComponentHTMLElement } from '../../../types/IComponent';

import { cnTextinput } from '../Textinput';
import './Textinput-Box.css';

export interface ITextinputBox extends IComponentHTMLElement {}

export const TextinputBox: FC<ITextinputBox> = ({
	className,
	innerRef,
	children,
	...props
}) => (
	<span {...props} ref={innerRef} className={cnTextinput('Box', [className])}>
		{children}
	</span>
);
