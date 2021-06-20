import React, { FC } from 'react';

import { IComponentHTMLElement } from '../../../types/IComponent';

import { cnTabsMenu } from '../TabsMenu';
import './TabsMenu-Container.css';

export interface ITabsMenuContainer<T extends HTMLElement = HTMLElement>
	extends IComponentHTMLElement<T> {}

export const TabsMenuContainer: FC<ITabsMenuContainer<HTMLUListElement>> = ({
	className,
	children,
	innerRef,
	...props
}) => {
	return (
		<ul
			{...props}
			ref={innerRef}
			className={cnTabsMenu('Container', [className])}
		>
			{children}
		</ul>
	);
};
