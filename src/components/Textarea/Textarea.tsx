import React, { FC, ReactNode, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { useComponentRegistry } from '@bem-react/di';

import {
	IComponentHTMLElement,
	IComponentWithControlProps,
} from '../../types/IComponent';

import './Textarea.css';

import { ITextareaControl } from './Control/Textarea-Control';
import { ITextareaRegistry } from './Textarea.registry';

export const cnTextarea = cn('Textarea');

export interface ITextareaProps
	extends Omit<IComponentHTMLElement<HTMLDivElement>, 'onChange'>,
		IComponentWithControlProps<ITextareaControl>,
		// copy props to fast access
		Pick<
			ITextareaControl,
			'value' | 'onChange' | 'disabled' | 'placeholder' | 'spellCheck'
		> {
	/**
	 * Label for textarea
	 */
	hint?: string;

	/**
	 * Visual current state
	 */
	state?: 'error';

	/**
	 * Extension slot
	 */
	addonBeforeControl?: ReactNode;

	/**
	 * Extension slot
	 */
	addonAfterControl?: ReactNode;
}

export const Textarea: FC<ITextareaProps> = ({
	value,
	onChange,
	disabled,
	placeholder,
	spellCheck,

	hint,
	state,
	className,
	innerRef,

	addonBeforeControl,
	addonAfterControl,
	controlProps,
	...props
}) => {
	// Prevent rerender due to use spread
	const controlPropsMix = useMemo(
		() => ({
			value,
			onChange,
			disabled,
			placeholder,
			spellCheck,
			...controlProps,
		}),
		[value, onChange, disabled, placeholder, spellCheck, controlProps],
	);

	const {
		Wrap,
		Control,
		Box,
		Hint,
	} = useComponentRegistry<ITextareaRegistry>(cnTextarea());

	return (
		<div
			{...props}
			className={cnTextarea({ state, disabled }, [className])}
			ref={innerRef}
		>
			<Wrap>
				{addonBeforeControl}
				<Control {...controlPropsMix} />
				{addonAfterControl}
				<Box />
			</Wrap>
			{hint && <Hint>{hint}</Hint>}
		</div>
	);
};

Textarea.displayName = cnTextarea();
