import { Registry } from '@bem-react/di';

import { IPopupRegistry } from '.';

import { cnPopup } from '../Popup';
import { PopupTail } from '../Tail/Popup-Tail';

export const regObjects: IPopupRegistry = {
	Tail: PopupTail,
};

export const PopupDesktopRegistry = new Registry({ id: cnPopup() }).fill(
	regObjects as any,
);
