import React, { FC } from 'react';

import { IComponentHTMLElement } from '../../../types/IComponent';

import { cnButton } from '../Button';
import './Button-Content.css';

export interface IButtonContent extends IComponentHTMLElement<HTMLDivElement> {
	type?: string;
	raw?: boolean;
}

export const ButtonContent: FC<IButtonContent> = ({
	className,
	children,
	type,
	raw,
	innerRef,
	...props
}) => (
	<div
		{...props}
		ref={innerRef}
		className={cnButton('Content', { type, raw }, [className])}
	>
		{children}
	</div>
);
