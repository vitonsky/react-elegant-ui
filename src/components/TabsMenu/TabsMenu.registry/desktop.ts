import { Registry } from '../../../lib/di';

import { cnTabsMenu } from '../TabsMenu';
import { TabsMenuContainer } from '../Container/TabsMenu-Container';
import { TabsMenuTab } from '../Tab/TabsMenu-Tab';

import { ITabsMenuRegistry as ITabsMenuDesktopRegistry } from '.';

export { ITabsMenuRegistry as ITabsMenuDesktopRegistry } from '.';

export const regObjects: ITabsMenuDesktopRegistry<{
	Container: HTMLUListElement;
	Tab: HTMLLIElement;
}> = {
	Container: TabsMenuContainer,
	Tab: TabsMenuTab,
};

export const TabsMenuDesktopRegistry = new Registry({ id: cnTabsMenu() }).fill(
	regObjects as any,
);
