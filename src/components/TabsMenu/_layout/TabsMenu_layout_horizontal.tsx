import React from 'react';

import { withHOCConstructor } from '../../../lib/compose';

import { ITabsMenuProps, cnTabsMenu } from '../TabsMenu';
import './TabsMenu_layout_horizontal.css';

export interface IModTabsMenuLayoutHorizontal {
	layout?: 'horizontal';
}

/**
 * Modifier, responsible for arrangement of tabs.
 * @param {IModTabsMenuLayoutHorizontal} props
 */
export const withModTabsMenuLayoutHorizontal = withHOCConstructor<
	IModTabsMenuLayoutHorizontal,
	ITabsMenuProps
>(
	{ matchProps: { layout: 'horizontal' }, privateProps: ['layout'] },
	(TabsMenu) => ({ layout, className, ...props }) => (
		<TabsMenu
			{...props}
			orientation="horizontal"
			className={cnTabsMenu({ layout }, [className])}
		/>
	),
);
