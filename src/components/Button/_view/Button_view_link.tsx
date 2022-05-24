import { withClassnameHOC } from '../../../lib/compose';

import { cnButton } from '../Button';
import './Button_view_link.css';

export interface IModButtonViewLink {
	view?: 'link';
}

export const withModButtonViewLink = withClassnameHOC<IModButtonViewLink>(
	cnButton(),
	{ view: 'link' },
);
