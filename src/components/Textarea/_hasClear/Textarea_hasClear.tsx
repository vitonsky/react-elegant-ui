import React, {
	ComponentType,
	FC,
	useCallback,
	MouseEventHandler,
} from 'react';
import { useComponentRegistry } from '@bem-react/di';

import { ITextareaClearRegistry } from '../Textarea.registry/features';
import { cnTextarea, ITextareaProps } from '../Textarea';

import './Textarea_hasClear.css';

export interface IModTextareaHasClearProps {
	hasClear?: boolean;
	onClearClick?: MouseEventHandler<HTMLSpanElement>;
}

export const withModTextareaHasClear = (
	Textarea: ComponentType<IModTextareaHasClearProps & ITextareaProps>,
) => {
	const WithHasClear: FC<IModTextareaHasClearProps & ITextareaProps> = ({
		hasClear,
		onClearClick,
		addonBeforeControl,
		className,
		...props
	}) => {
		const visible = Boolean(props.value ?? props.defaultValue);

		const onMouseDown = useCallback(
			(evt: React.MouseEvent<HTMLSpanElement>) => {
				// Prevent leave focus from Control.
				evt.preventDefault();
			},
			[],
		);

		const { Clear } = useComponentRegistry<ITextareaClearRegistry>(
			cnTextarea(),
		);

		return (
			<Textarea
				{...props}
				className={cnTextarea({ hasClear }, [className])}
				addonBeforeControl={
					hasClear ? (
						<>
							<Clear
								onMouseDown={onMouseDown}
								onClick={onClearClick}
								visible={visible}
							/>
							{addonBeforeControl}
						</>
					) : (
						addonBeforeControl
					)
				}
			/>
		);
	};

	return WithHasClear;
};
