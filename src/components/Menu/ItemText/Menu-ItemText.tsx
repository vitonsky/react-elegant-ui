import React, { FC } from 'react';

import { IComponentHTMLElement } from '../../../types/IComponent';

import { cnMenu } from '../Menu';

export interface IItemText extends IComponentHTMLElement<HTMLElement> {}

export const ItemText: FC<IItemText> = ({ children, ...props }) => (
	<span {...props} className={cnMenu('ItemText')}>
		{children}
	</span>
);
