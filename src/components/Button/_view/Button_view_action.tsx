import { withClassnameHOC } from '../../../lib/compose';

import { cnButton } from '../Button';
import './Button_view_action.css';

export interface IModButtonViewAction {
	view?: 'action';
}

export const withModButtonViewAction = withClassnameHOC<IModButtonViewAction>(
	cnButton(),
	{ view: 'action' },
);
