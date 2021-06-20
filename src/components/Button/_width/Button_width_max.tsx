import { withClassnameHOC } from '../../../lib/compose';

import { cnButton } from '../Button';
import './Button_width_max.css';

export interface IModButtonWidthMax {
	width?: 'max';
}

export const withModButtonWidthMax = withClassnameHOC<IModButtonWidthMax>(
	cnButton(),
	{ width: 'max' },
);
