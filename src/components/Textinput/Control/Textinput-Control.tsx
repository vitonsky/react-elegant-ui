import React, {
	createContext,
	FC,
	InputHTMLAttributes,
	useContext,
	useMemo,
} from 'react';

import { IComponentElement } from '../../../types/IComponent';
import { mergeRefsAsCallback } from '../../../lib/mergeRefs';

import { cnTextinput } from '../Textinput';
import './Textinput-Control.css';

export interface ITextinputControl
	extends IComponentElement<HTMLInputElement>,
		InputHTMLAttributes<HTMLInputElement> {}

export const TextareaHintContext = createContext<ITextinputControl>({});

export const TextinputControl: FC<ITextinputControl> = ({
	spellCheck = false,
	className,
	innerRef,
	...props
}) => {
	const { innerRef: innerRefCtx, ...ctx } = useContext(TextareaHintContext);

	const innerRefMix = useMemo(
		() => mergeRefsAsCallback(innerRef, innerRefCtx),
		[innerRef, innerRefCtx],
	);

	return (
		<input
			type="text"
			{...ctx}
			{...props}
			ref={innerRefMix}
			className={cnTextinput('Control', [className])}
			spellCheck={spellCheck}
		/>
	);
};
