import { withClassnameHOC } from '../../../lib/compose';

import { cnSelect } from '../Select@desktop';
import './Select_listboxSize_max.css';

export interface IModSelectListboxSizeMax {
	listboxSize?: 'max';
}

/**
 * Modifier to set listbox width as large as need
 *
 * It useful for use with `ScrollbarOverlapContentFix`
 */
export const withModSelectListboxSizeMax = withClassnameHOC<IModSelectListboxSizeMax>(
	cnSelect(),
	{ listboxSize: 'max' },
);
