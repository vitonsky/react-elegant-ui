import { ComponentType } from 'react';

import { IPopupTail } from '../Tail/Popup-Tail';

export interface IPopupRegistry {
	Tail: ComponentType<IPopupTail>;
}
