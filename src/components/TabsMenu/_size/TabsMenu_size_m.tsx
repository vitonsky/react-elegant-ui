import { withClassnameHOC } from '../../../lib/compose';

import { cnTabsMenu } from '../TabsMenu';
import './TabsMenu_size_m.css';

export interface IModTabsMenuSizeM {
	size?: 'm';
}

/**
 * Modifier responsible for size
 * @param {IModTabsMenuSizeM} props
 */
export const withModTabsMenuSizeM = withClassnameHOC<IModTabsMenuSizeM>(
	cnTabsMenu(),
	{ size: 'm' },
);
