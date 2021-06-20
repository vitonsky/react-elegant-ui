import React, { FC, ReactElement, ReactNode, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { useComponentRegistry } from '@bem-react/di';

import {
	IComponentHTMLElement,
	IComponentWithControlProps,
} from '../../types/IComponent';

import './Textinput.css';

import { ITextinputControl } from './Control/Textinput-Control';
import { ITextinputRegistry } from './Textinput.registry';
import { makeChain } from '../../lib/makeChain';

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
}

export const Textinput: FC<ITextinputProps> = ({
	value,
	onChange,
	setValue,
	disabled,
	placeholder,
	spellCheck,

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
			onChange: makeChain(onChange, controlProps?.onChange, (evt) => {
				if (setValue !== undefined) {
					setValue(evt.target.value);
				}
			}),
		}),
		[
			value,
			onChange,
			setValue,
			disabled,
			placeholder,
			spellCheck,
			controlProps,
		],
	);

	const {
		Wrap,
		Control,
		Icon,
		Box,
		Hint,
	} = useComponentRegistry<ITextinputRegistry>(cnTextinput());

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
