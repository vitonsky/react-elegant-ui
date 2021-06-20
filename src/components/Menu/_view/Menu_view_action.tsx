import { withClassnameHOC } from '../../../lib/compose';

import { cnMenu } from '../Menu';
import './Menu_view_action.css';

export interface IModMenuViewAction {
	view?: 'action';
}

export const withModMenuViewAction = withClassnameHOC<IModMenuViewAction>(
	cnMenu(),
	{ view: 'action' },
);
