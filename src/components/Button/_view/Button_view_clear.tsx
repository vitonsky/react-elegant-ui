import { withClassnameHOC } from '../../../lib/compose';

import { cnButton } from '../Button';
import './Button_view_clear.css';

export interface IModButtonViewClear {
	view?: 'clear';
}

export const withModButtonViewClear = withClassnameHOC<IModButtonViewClear>(
	cnButton(),
	{ view: 'clear' },
);
