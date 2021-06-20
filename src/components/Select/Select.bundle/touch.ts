import { withRegistry } from '@bem-react/di';

import { Select as SelectTouch } from '../Select@touch';

// Registry
import { SelectTouchRegistry } from '../Select.registry/touch';

export * from '../Select@touch';
export const Select = withRegistry(SelectTouchRegistry)(SelectTouch);
