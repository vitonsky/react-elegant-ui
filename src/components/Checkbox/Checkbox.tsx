import React, {
	FC,
	ReactNode,
	Ref,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { cn } from '@bem-react/classname';
import { useComponentRegistry } from '../../lib/di';

import {
	IComponentHTMLElement,
	IComponentWithAddonNodes,
} from '../../types/IComponent';
import { useToggleable } from '../../hooks/behavior/useToggleable';
import { useUniqueId } from '../../hooks/useUniqueId';
import { useEqualMemo } from '../../hooks/useEqualMemo';
import { runByReadyState } from '../../lib/runByReadyState';
import { mergeRefsAsCallback } from '../../lib/mergeRefs';
import { mergeProps } from '../../lib/merge';
import { makeChain } from '../../lib/makeChain';

import { ICheckboxRegistry } from './Checkbox.registry';
import './Checkbox.css';

export const cnCheckbox = cn('Checkbox');

export interface ICheckboxProps
	extends IComponentHTMLElement<HTMLDivElement>,
		IComponentWithAddonNodes {
	/**
	 * Checkbox state
	 */
	checked?: boolean;

	/**
	 * State setter
	 */
	setChecked?: (state: boolean) => void;

	/**
	 * Set unavailable state
	 */
	disabled?: boolean;

	/**
	 * Visually make checkbox state is indeterminate. Does not affect to real state from prop `checked`
	 *
	 * Useful to show state of checkbox tree, when sub items selected partially
	 */
	indeterminate?: boolean;

	/**
	 * Focus on element after loading page
	 */
	autoFocus?: boolean;

	/**
	 * Checkbox text
	 */
	label?: ReactNode;
	labelRef?: Ref<HTMLLabelElement>;

	/**
	 * Forward props to control
	 */
	controlProps?: IComponentHTMLElement<HTMLInputElement>;
}

export const Checkbox: FC<ICheckboxProps> = ({
	checked,
	setChecked,
	disabled,
	autoFocus,
	indeterminate,
	className,
	innerRef,
	label,
	labelRef,
	controlProps = {},
	addonBefore,
	addonAfter,
	...props
}) => {
	const controlId = useUniqueId('checkbox');
	const labelId = useUniqueId('checkbox-label');

	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const { toggle } = useToggleable({
		state: checked,
		setState: setChecked,
		disabled,
	});

	// forward user handler
	// `makeChain` is callback constructor
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onChange = useCallback(makeChain(toggle, controlProps.onChange), [
		toggle,
		controlProps.onChange,
	]);

	const controlRef = useRef<HTMLInputElement>(null);
	const controlRefCb = useMemo(
		() => mergeRefsAsCallback(controlRef, controlProps.innerRef),
		[controlRef, controlProps.innerRef],
	);

	// sync indeterminate state for control
	useEffect(() => {
		if (controlRef.current !== null) {
			controlRef.current.indeterminate = !!indeterminate;
		}
	});

	// focus to control
	useEffect(() => {
		if (autoFocus) {
			// await loading page if need, to prevent blink
			runByReadyState(() => {
				if (controlRef.current !== null) {
					controlRef.current.focus();
				}
			}, 'complete');
		}
		// run for first render only
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// merge root props and inner handlers for it
	const propsMix = useEqualMemo(
		() =>
			mergeProps(props, {
				onFocus: () => setIsFocused(true),
				onBlur: () => setIsFocused(false),
				onMouseEnter: () => setIsHovered(true),
				onMouseLeave: () => setIsHovered(false),
			}),
		[props, setIsFocused, setIsHovered],
	);

	const { Box, Control, Tick, Label } =
		useComponentRegistry<ICheckboxRegistry>(cnCheckbox());

	return (
		<div
			{...propsMix}
			ref={innerRef}
			className={cnCheckbox(
				{
					checked: checked || indeterminate,
					indeterminate,
					disabled,
					hovered: isHovered,
					focused: isFocused,
				},
				[className],
			)}
		>
			{addonBefore}
			<Box>
				{/* Render control for autofill */}
				<Control
					{...controlProps}
					innerRef={controlRefCb}
					id={controlId}
					disabled={disabled}
					checked={checked}
					onChange={onChange}
					aria-checked={indeterminate ? 'mixed' : checked}
					aria-labelledby={labelId}
				/>
				<Tick indeterminate={indeterminate} />
			</Box>
			{label && (
				<Label id={labelId} target={controlId} innerRef={labelRef}>
					{label}
				</Label>
			)}
			{addonAfter}
		</div>
	);
};

Checkbox.displayName = cnCheckbox();
