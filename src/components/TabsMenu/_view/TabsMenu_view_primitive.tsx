import { withClassnameHOC } from '../../../lib/compose';

import { cnTabsMenu } from '../TabsMenu';
import './TabsMenu_view_primitive.css';

export interface IModTabsMenuViewPrimitive {
	view?: 'primitive';
}

/**
 * Modifier responsible for apperance of tabs
 */
export const withModTabsMenuViewPrimitive = withClassnameHOC<IModTabsMenuViewPrimitive>(
	cnTabsMenu(),
	{ view: 'primitive' },
);
