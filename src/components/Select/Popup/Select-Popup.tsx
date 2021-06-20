import React, { createContext, FC, useContext } from 'react';
import { useComponentRegistry } from '@bem-react/di';

import { IPopupProps } from '../../Popup/Popup';
import { IModPopupTargetAnchor } from '../../Popup/_target/Popup_target_anchor';

import { ISelectDesktopRegistry } from '../Select.registry/desktop';
import { cnSelect } from '../Select';
import './Select-Popup.css';

export type ISelectPopup = IPopupProps & IModPopupTargetAnchor;

export const SelectPopupContext = createContext<ISelectPopup>({});

export const SelectPopup: FC<ISelectPopup> = ({ className, ...props }) => {
	const { PopupComponent } = useComponentRegistry<ISelectDesktopRegistry>(
		cnSelect(),
	);

	const ctx = useContext(SelectPopupContext);

	return (
		<PopupComponent
			direction={[
				'bottom-start',
				'bottom',
				'bottom-end',
				'top-start',
				'top',
				'top-end',
			]}
			tabIndex={-1}
			{...ctx}
			{...props}
			className={cnSelect('Popup', [className, ctx.className])}
		/>
	);
};
