import { withClassnameHOC } from '../../../lib/compose';

import { cnMenu } from '../Menu';
import './Menu_view_default.css';

export interface IModMenuViewDefault {
	view?: 'default';
}

export const withModMenuViewDefault = withClassnameHOC<IModMenuViewDefault>(
	cnMenu(),
	{ view: 'default' },
);
