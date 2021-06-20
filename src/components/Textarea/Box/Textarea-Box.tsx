import React, { FC } from 'react';

import { IComponentHTMLElement } from '../../../types/IComponent';

import { cnTextarea } from '../Textarea';
import './Textarea-Box.css';

export interface ITextareaBox extends IComponentHTMLElement {}

export const TextareaBox: FC<ITextareaBox> = ({
	className,
	innerRef,
	children,
	...props
}) => (
	<span {...props} ref={innerRef} className={cnTextarea('Box', [className])}>
		{children}
	</span>
);
