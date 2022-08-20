import React, { FC, ReactElement, ReactNode, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { useComponentRegistry } from '../../lib/di';

import {
	IComponentHTMLElement,
	IComponentWithControlProps,
} from '../../types/IComponent';
import { makeChain } from '../../lib/makeChain';

import './Textinput.css';

import { ITextinputControl } from './Control/Textinput-Control';
import { ITextinputRegistry } from './Textinput.registry';

export const cnTextinput = cn('Textinput');

export interface ITextinputProps
	extends Omit<IComponentHTMLElement<HTMLDivElement>, 'onChange'>,
		IComponentWithControlProps<ITextinputControl>,
		// copy props to fast access
		Pick<
			ITextinputControl,
			'value' | 'onChange' | 'disabled' | 'placeholder' | 'spellCheck'
		> {
	/**
	 * Label for input
	 */
	hint?: string;

	setValue?: (value: string) => void;

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

	/**
	 * Icon slot
	 */
	iconLeft?: ReactElement;

	/**
	 * Icon slot
	 */
	iconRight?: ReactElement;

	/**
	 * Fire on change value by user input
	 */
	onInputText?: (text: string) => void;
}

export const Textinput: FC<ITextinputProps> = ({
	value,
	onChange,
	setValue,
	disabled,
	placeholder,
	spellCheck,
	onInputText,

	addonBeforeControl,
	addonAfterControl,
	iconLeft,
	iconRight,
	hint,
	state,
	className,
	innerRef,
	controlProps,
	...props
}) => {
	// Prevent rerender due to use spread
	const controlPropsMix = useMemo(
		() => ({
			value,
			disabled,
			placeholder,
			spellCheck,
			...controlProps,
			onChange: makeChain(controlProps?.onChange, onChange, (evt) => {
				if (onInputText === undefined) return;
				onInputText(evt.target.value);
			}),
		}),
		[
			value,
			disabled,
			placeholder,
			spellCheck,
			controlProps,
			onChange,
			onInputText,
		],
	);

	const { Wrap, Control, Icon, Box, Hint } =
		useComponentRegistry<ITextinputRegistry>(cnTextinput());

	return (
		<div
			{...props}
			className={cnTextinput({ state, disabled }, [className])}
			ref={innerRef}
		>
			<Wrap>
				{iconLeft && <Icon side="left" component={iconLeft} />}
				{addonBeforeControl}
				<Control {...controlPropsMix} />
				{addonAfterControl}
				{iconRight && <Icon side="right" component={iconRight} />}
				<Box />
			</Wrap>
			{hint && <Hint>{hint}</Hint>}
		</div>
	);
};

Textinput.displayName = cnTextinput();
