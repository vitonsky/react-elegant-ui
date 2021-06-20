import React, { FC } from 'react';
import { IComponentHTMLElement } from '../../../types/IComponent';

import { cnTabsMenu } from '../TabsMenu';
import './TabsMenu-Tab.css';

export interface ITabsMenuTab<T extends HTMLElement = HTMLElement>
	extends IComponentHTMLElement<T> {
	/**
	 * Is active tab
	 */
	active?: boolean;

	/**
	 * Disabled tab
	 */
	disabled?: boolean;

	/**
	 * Is first tab
	 *
	 * @internal
	 */
	first?: boolean;
}

export const TabsMenuTab: FC<ITabsMenuTab<HTMLLIElement>> = ({
	active,
	disabled,
	first,
	innerRef,
	className,
	children,
	...props
}) => (
	<li
		{...props}
		aria-selected={active}
		aria-disabled={disabled}
		ref={innerRef}
		className={cnTabsMenu(
			'Tab',
			{
				active,
				disabled,
				first,
			},
			[className],
		)}
		role="tab"
		// For active tab set tabIndex 0 to allow focus on it by keyboard
		// for other tabs set -1 for exclude it from navigation
		tabIndex={disabled ? undefined : active ? 0 : -1}
	>
		{children}
	</li>
);
