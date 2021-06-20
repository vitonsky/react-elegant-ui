import { withClassnameHOC } from '../../../lib/compose';

import { cnTabsMenu } from '../TabsMenu';
import './TabsMenu_view_default.css';

export interface IModTabsMenuViewDefault {
	view?: 'default';
}

/**
 * Modifier responsible for apperance of tabs
 */
export const withModTabsMenuViewDefault = withClassnameHOC<IModTabsMenuViewDefault>(
	cnTabsMenu(),
	{ view: 'default' },
);
