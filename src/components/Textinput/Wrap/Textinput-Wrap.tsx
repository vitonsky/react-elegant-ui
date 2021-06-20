import React, { createContext, FC, useContext, useMemo } from 'react';

import { IComponentHTMLElement } from '../../../types/IComponent';
import { mergeRefsAsCallback } from '../../../lib/mergeRefs';

import { cnTextinput } from '../Textinput';

import './Textinput-Wrap.css';

export interface ITextinputWrap extends IComponentHTMLElement<HTMLDivElement> {}

export const TextareaHintContext = createContext<ITextinputWrap>({});

export const TextinputWrap: FC<ITextinputWrap> = ({
	innerRef,
	className,
	...props
}) => {
	const { innerRef: innerRefCtx, ...ctx } = useContext(TextareaHintContext);

	const innerRefMix = useMemo(
		() => mergeRefsAsCallback(innerRef, innerRefCtx),
		[innerRef, innerRefCtx],
	);

	return (
		<div
			{...ctx}
			{...props}
			ref={innerRefMix}
			className={cnTextinput('Wrap', [className])}
		></div>
	);
};
