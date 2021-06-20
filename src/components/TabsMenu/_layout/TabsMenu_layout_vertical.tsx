import React from 'react';

import { withHOCConstructor } from '../../../lib/compose';

import { ITabsMenuProps, cnTabsMenu } from '../TabsMenu';
import './TabsMenu_layout_vertical.css';

export interface IModTabsMenuLayoutVertical {
	layout?: 'vertical';
}

/**
 * Modifier, responsible for arrangement of tabs.
 * @param {IModTabsMenuLayoutVertical} props
 */
export const withModTabsMenuLayoutVertical = withHOCConstructor<
	IModTabsMenuLayoutVertical,
	ITabsMenuProps
>(
	{ matchProps: { layout: 'vertical' }, privateProps: ['layout'] },
	(TabsMenu) => ({ layout, className, ...props }) => (
		<TabsMenu
			{...props}
			orientation="vertical"
			className={cnTabsMenu({ layout }, [className])}
		/>
	),
);
