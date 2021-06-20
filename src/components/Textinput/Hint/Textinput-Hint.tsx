import React, { createContext, FC, useContext, useMemo } from 'react';

import { IComponentHTMLElement } from '../../../types/IComponent';
import { mergeRefsAsCallback } from '../../../lib/mergeRefs';

import { cnTextinput } from '../Textinput';
import './Textinput-Hint.css';

export interface ITextinputHint extends IComponentHTMLElement {}

export const TextareaHintContext = createContext<ITextinputHint>({});

export const TextinputHint: FC<ITextinputHint> = ({
	innerRef,
	className,
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
			className={cnTextinput('Hint', [className])}
		>
			{children}
		</span>
	);
};
