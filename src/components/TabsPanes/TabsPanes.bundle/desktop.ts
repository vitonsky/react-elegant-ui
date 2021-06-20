import { withRegistry } from '@bem-react/di';

import { TabsPanes as TabsPanesBase } from '../TabsPanes@desktop';
import { TabsPanesDesktopRegistry } from '../TabsPanes.registry/desktop';

export * from '../TabsPanes';

export const TabsPanes = withRegistry(TabsPanesDesktopRegistry)(TabsPanesBase);
