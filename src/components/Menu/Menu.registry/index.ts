import { ComponentType } from 'react';

import { IMenuContainer } from '../Container/Menu-Container';
import { IMenuGroup } from '../Group/Menu-Group';
import { IMenuItem } from '../Item/Menu-Item';
import { IItemText } from '../ItemText/Menu-ItemText';

export interface IMenuRegistry {
	Container: ComponentType<IMenuContainer>;
	Group: ComponentType<IMenuGroup>;
	Item: ComponentType<IMenuItem>;
	ItemText: ComponentType<IItemText>;
}
