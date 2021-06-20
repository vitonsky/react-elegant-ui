import { withClassnameHOC } from '../../../lib/compose';

import { cnTabsMenu } from '../TabsMenu';
import './TabsMenu_size_s.css';

export interface IModTabsMenuSizeS {
	size?: 's';
}

/**
 * Modifier responsible for size
 * @param {IModTabsMenuSizeS} props
 */
export const withModTabsMenuSizeS = withClassnameHOC<IModTabsMenuSizeS>(
	cnTabsMenu(),
	{ size: 's' },
);
