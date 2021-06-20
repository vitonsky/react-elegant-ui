import React, {
	createContext,
	FC,
	InputHTMLAttributes,
	useContext,
	useMemo,
} from 'react';

import { IComponentElement } from '../../../types/IComponent';
import { mergeRefsAsCallback } from '../../../lib/mergeRefs';

import { cnTextarea } from '../Textarea';
import './Textarea-Control.css';

export interface ITextareaControl
	extends IComponentElement<HTMLTextAreaElement>,
		InputHTMLAttributes<HTMLTextAreaElement> {}

export const TextareaControlContext = createContext<ITextareaControl>({});

export const TextareaControl: FC<ITextareaControl> = ({
	spellCheck = false,
	className,
	innerRef,
	...props
}) => {
	const { innerRef: innerRefCtx, ...ctx } = useContext(
		TextareaControlContext,
	);

	const innerRefMix = useMemo(
		() => mergeRefsAsCallback(innerRef, innerRefCtx),
		[innerRef, innerRefCtx],
	);

	return (
		<textarea
			{...ctx}
			{...props}
			ref={innerRefMix}
			className={cnTextarea('Control', [className])}
			spellCheck={spellCheck}
		/>
	);
};
