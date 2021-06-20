import React, { createContext, FC, useContext } from 'react';

import { IComponentHTMLElement } from '../../../types/IComponent';

import { cnMenu } from '../Menu';
import './Menu-Container.css';

export interface IMenuContainer<T extends HTMLElement = HTMLElement>
	extends IComponentHTMLElement<T> {}

export const MenuContainerContext = createContext<IMenuContainer>({});

export const MenuContainer: FC<IMenuContainer> = ({
	className,
	children,
	...props
}) => {
	const ctx = useContext(MenuContainerContext);

	return (
		<div
			{...ctx}
			{...props}
			className={cnMenu('Container', [className, ctx.className])}
		>
			{children}
		</div>
	);
};
