import { withClassnameHOC } from '../../../lib/compose';

import { cnPopup } from '../Popup';
import './Popup_view_default.css';

export interface IModPopupViewDefault {
	view?: 'default';
}

export const withModPopupViewDefault = withClassnameHOC<IModPopupViewDefault>(
	cnPopup(),
	{
		view: 'default',
	},
);
