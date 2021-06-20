import { withClassnameHOC } from '../../../lib/compose';

import { cnButton } from '../Button';
import './Button_view_default.css';

export interface IModButtonViewDefault {
	view?: 'default';
}

export const withModButtonViewDefault = withClassnameHOC<IModButtonViewDefault>(
	cnButton(),
	{ view: 'default' },
);
