import { withClassnameHOC } from '../../../lib/compose';

import { cnPopup } from '../Popup';
import './Popup_nonvisual.css';

export interface IModPopupNonvisual {
	/**
	 * Disable visual styles
	 */
	nonvisual?: boolean;
}

export const withModPopupNonvisual = withClassnameHOC<IModPopupNonvisual>(
	cnPopup(),
	{
		nonvisual: true,
	},
);
