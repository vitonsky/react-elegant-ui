import { ComponentType } from 'react';

import { ITabsMenuContainer } from '../Container/TabsMenu-Container';
import { ITabsMenuTab } from '../Tab/TabsMenu-Tab';

export interface ITabsMenuRegistry<
	T extends {
		Container: HTMLElement;
		Tab: HTMLElement;
	} = {
		Container: HTMLElement;
		Tab: HTMLElement;
	}
> {
	Container: ComponentType<ITabsMenuContainer<T['Container']>>;
	Tab: ComponentType<ITabsMenuTab<T['Tab']>>;
}
