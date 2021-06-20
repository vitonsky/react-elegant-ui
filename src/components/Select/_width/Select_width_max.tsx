import { withClassnameHOC } from '../../../lib/compose';

import { cnSelect } from '../Select@desktop';
import './Select_width_max.css';

export interface IModSelectWidthMax {
	width?: 'max';
}

/**
 * Modifier to set select width to max size
 */
export const withModSelectWidthMax = withClassnameHOC<IModSelectWidthMax>(
	cnSelect(),
	{ width: 'max' },
);
