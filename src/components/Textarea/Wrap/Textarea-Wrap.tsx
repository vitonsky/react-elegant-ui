import React, { createContext, FC, useContext, useMemo } from 'react';

import { IComponentHTMLElement } from '../../../types/IComponent';
import { mergeRefsAsCallback } from '../../../lib/mergeRefs';

import { cnTextarea } from '../Textarea';

import './Textarea-Wrap.css';

export interface ITextareaWrap<T extends HTMLElement = HTMLDivElement>
	extends IComponentHTMLElement<T> {}

export const TextareaWrapContext = createContext<ITextareaWrap>({});

export const TextareaWrap: FC<ITextareaWrap> = ({
	innerRef,
	className,
	...props
}) => {
	const { innerRef: innerRefCtx, ...ctx } = useContext(TextareaWrapContext);

	const innerRefMix = useMemo(
		() => mergeRefsAsCallback(innerRef, innerRefCtx),
		[innerRef, innerRefCtx],
	);

	return (
		<div
			{...ctx}
			{...props}
			className={cnTextarea('Wrap', [className])}
			ref={innerRefMix}
		></div>
	);
};
