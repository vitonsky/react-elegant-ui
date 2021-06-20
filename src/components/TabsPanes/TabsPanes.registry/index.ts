import { ComponentType } from 'react';

import { ITabsPanesPane } from '../Pane/TabsPanes-Pane';

export interface ITabsPanesRegistry {
	Pane: ComponentType<ITabsPanesPane>;
}
