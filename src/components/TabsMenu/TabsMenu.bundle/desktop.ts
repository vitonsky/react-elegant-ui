import { withRegistry } from '../../../lib/di';

import { compose, composeU, ExtractProps } from '../../../lib/compose';

import { TabsMenuDesktopRegistry } from '../TabsMenu.registry/desktop';

// base
import { TabsMenu as TabsMenuDesktop } from '../TabsMenu@desktop';

// _layout
import { withModTabsMenuLayoutHorizontal } from '../_layout/TabsMenu_layout_horizontal';
import { withModTabsMenuLayoutVertical } from '../_layout/TabsMenu_layout_vertical';

// _size
import { withModTabsMenuSizeM } from '../_size/TabsMenu_size_m';
import { withModTabsMenuSizeS } from '../_size/TabsMenu_size_s';

// _view
import { withModTabsMenuViewDefault } from '../_view/TabsMenu_view_default@desktop';
import { withModTabsMenuViewPrimitive } from '../_view/TabsMenu_view_primitive@desktop';
import { withModTabsMenuViewMotion } from '../_view/TabsMenu_view_motion@desktop';

export * from '../TabsMenu';

export const TabsMenu = compose(
	withRegistry(TabsMenuDesktopRegistry),
	composeU(withModTabsMenuLayoutHorizontal, withModTabsMenuLayoutVertical),
	composeU(
		withModTabsMenuViewDefault,
		withModTabsMenuViewPrimitive,
		withModTabsMenuViewMotion,
	),
	composeU(withModTabsMenuSizeM, withModTabsMenuSizeS),
)(TabsMenuDesktop);

TabsMenu.defaultProps = { view: 'default', size: 'm' };

export type TabsMenuProps = ExtractProps<typeof TabsMenu>;
