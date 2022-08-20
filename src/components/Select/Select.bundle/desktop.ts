import { withRegistry } from '../../../lib/di';

import { compose, composeU, ExtractProps } from '../../../lib/compose';

import { Select as SelectDesktop } from '../Select@desktop';

// polyfill
import { ScrollbarOverlapContentFixIsomorphic } from '../Select.hocs/ScrollbarOverlapContentFix';

// Opened state manager
import { withOpenedStateManager } from '../../../hocs/state/withOpenedStateManager';

// _width
import { withModSelectWidthMax } from '../_width/Select_width_max';

// _listboxSize
import { withModSelectListboxSizeMax } from '../_listboxSize/Select_listboxSize_max';

// Registry
import { SelectDesktopRegistry } from '../Select.registry/desktop';

export * from '../Select@desktop';

export const Select = compose(
	withOpenedStateManager,
	composeU(withModSelectWidthMax),
	composeU(withModSelectListboxSizeMax),
	ScrollbarOverlapContentFixIsomorphic,
	withRegistry(SelectDesktopRegistry),
)(SelectDesktop);

Select.defaultProps = { listboxSize: 'max' };

export type ISelectProps = ExtractProps<typeof Select>;
