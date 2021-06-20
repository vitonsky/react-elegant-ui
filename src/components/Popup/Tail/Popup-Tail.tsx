import React, { createContext, CSSProperties, FC, useContext } from 'react';

import { IComponentHTMLElement } from '../../../types/IComponent';

import { cnPopup } from '../Popup';
import './Popup-Tail.css';

export interface IPopupTail extends IComponentHTMLElement<HTMLDivElement> {
	className?: string;
	style?: CSSProperties;
}

export interface IPopupTailContext extends IPopupTail {}

export const TailContext = createContext<IPopupTailContext>({});

export const PopupTail: FC<IPopupTail> = ({ className, style, innerRef }) => {
	const { style: styleCtx, className: classNameCtx } = useContext(
		TailContext,
	);

	return (
		<div
			ref={innerRef}
			className={cnPopup('Tail', null, [className, classNameCtx])}
			style={{ ...style, ...styleCtx }}
		/>
	);
};
