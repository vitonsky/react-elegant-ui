import React, { createContext, FC, useContext, useMemo } from 'react';

import { IComponentHTMLElement } from '../../../types/IComponent';
import { mergeRefsAsCallback } from '../../../lib/mergeRefs';

import { cnTextarea } from '../Textarea';
import './Textarea-Hint.css';

export interface ITextareaHint extends IComponentHTMLElement {}

export const TextareaHintContext = createContext<ITextareaHint>({});

export const TextareaHint: FC<ITextareaHint> = ({
	className,
	innerRef,
	children,
	...props
}) => {
	const { innerRef: innerRefCtx, ...ctx } = useContext(TextareaHintContext);

	const innerRefMix = useMemo(
		() => mergeRefsAsCallback(innerRef, innerRefCtx),
		[innerRef, innerRefCtx],
	);

	return (
		<span
			{...ctx}
			{...props}
			ref={innerRefMix}
			className={cnTextarea('Hint', [className])}
		>
			{children}
		</span>
	);
};
