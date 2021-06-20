import React, { ElementType, FC } from 'react';
import { cn } from '@bem-react/classname';
import { useComponentRegistry } from '@bem-react/di';
import { usePress } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import { PressEvents } from '@react-types/shared';

import {
	IComponentWithAddonNodes,
	IComponentHTMLElement,
} from '../../types/IComponent';
import { Defaultize } from '../../types/utility-types';

import { IconProvider } from '../Icon';

import { IButtonRegistry } from './Button.registry';
import './Button.css';

export const cnButton = cn('Button');

export interface IButtonProps
	extends Omit<IComponentHTMLElement<HTMLElement>, 'type'>,
		IComponentWithAddonNodes,
		PressEvents {
	/**
	 * TSX element for represent component
	 */
	as?: ElementType;

	/**
	 * Disable button to press
	 */
	disabled?: boolean;

	/**
	 * First icon
	 *
	 * It's just declarative slot, if need you can insert icon as child
	 */
	icon?: IconProvider;

	/**
	 * Icon left from text of button
	 *
	 * It's just declarative slot, if need you can insert icon as child
	 */
	iconLeft?: IconProvider;

	/**
	 * Icon right from text of button
	 *
	 * It's just declarative slot, if need you can insert icon as child
	 */
	iconRight?: IconProvider;

	/**
	 * Disable formatting content
	 */
	raw?: boolean;
}

export const defaultProps = {
	as: 'button' as const,
};

type DefaultProps = keyof typeof defaultProps;
type ButtonProps = Defaultize<IButtonProps, DefaultProps>;

export const Button: FC<IButtonProps> = (({
	as,
	disabled,
	raw,
	icon,
	iconLeft,
	iconRight,
	children,
	innerRef,
	className,
	addonBefore,
	addonAfter,
	onPress,
	onPressChange,
	onPressStart,
	onPressEnd,
	onPressUp,
	...props
}: ButtonProps) => {
	const { isPressed, pressProps } = usePress({
		isDisabled: disabled,
		onPress,
		onPressChange,
		onPressStart,
		onPressEnd,
		onPressUp,
	});

	const iconLeftOrIcon = iconLeft || icon;

	// insert innerRef back when `as` is component type
	if (typeof as !== 'string') {
		(props as IButtonProps).innerRef = innerRef;
	}

	const Component = as;
	const propsMix = mergeProps(props, pressProps);

	const { Content, Text, Icon } = useComponentRegistry<IButtonRegistry>(
		cnButton(),
	);

	return (
		<Component
			ref={typeof as === 'string' ? innerRef : undefined}
			{...propsMix}
			className={cnButton({ pressed: isPressed, disabled, raw }, [
				className,
			])}
			disabled={disabled}
			aria-disabled={disabled}
		>
			{addonBefore}
			{raw ? (
				children
			) : (
				<Content>
					{iconLeftOrIcon && (
						<Icon provider={iconLeftOrIcon} side="left" />
					)}
					{!children ? undefined : <Text>{children}</Text>}
					{iconRight && <Icon provider={iconRight} side="right" />}
				</Content>
			)}
			{addonAfter}
		</Component>
	);
}) as FC<IButtonProps>;

Button.displayName = cnButton();
Button.defaultProps = defaultProps;
