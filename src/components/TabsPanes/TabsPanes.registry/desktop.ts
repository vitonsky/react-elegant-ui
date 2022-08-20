import { Registry } from '../../../lib/di';
import { ITabsPanesRegistry } from '.';
import { TabsPanesPane } from '../Pane/TabsPanes-Pane';
import { cnTabsPanes } from '../TabsPanes';

export interface ITabsPanesDesktopRegistry extends ITabsPanesRegistry {}

export const regObjects: ITabsPanesDesktopRegistry = {
	Pane: TabsPanesPane,
};

export const TabsPanesDesktopRegistry = new Registry({
	id: cnTabsPanes(),
}).fill(regObjects as any);
