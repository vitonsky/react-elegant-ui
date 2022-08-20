import { useComponentRegistry } from '../../../lib/di';
import React, {
	ComponentType,
	FC,
	MouseEventHandler,
	useCallback,
} from 'react';

import { ITextinputRegistry } from '../Textinput.registry';
import { ITextinputClearRegistry } from '../Textinput.registry/features';
import { cnTextinput, ITextinputProps } from '../Textinput';

export interface IModTextinputHasClearProps {
	hasClear?: boolean;
	onClearClick?: MouseEventHandler<HTMLElement>;
}

export const withModTextinputHasClear = (
	Textinput: ComponentType<IModTextinputHasClearProps & ITextinputProps>,
) => {
	const WithHasClear: FC<IModTextinputHasClearProps & ITextinputProps> = ({
		hasClear,
		onClearClick,
		addonAfterControl,
		className,
		...props
	}) => {
		const visible = Boolean(props.value ?? props.defaultValue);

		const onMouseDownHandler = useCallback(
			(evt: React.MouseEvent<HTMLElement>) => {
				// Prevent leave focus from Control.
				evt.preventDefault();
			},
			[],
		);

		const { Icon, Clear } = useComponentRegistry<
			ITextinputRegistry & ITextinputClearRegistry
		>(cnTextinput());

		return (
			<Textinput
				{...props}
				className={cnTextinput({ hasClear }, [className])}
				addonAfterControl={
					hasClear ? (
						<>
							<Icon
								component={
									<Clear
										onMouseDown={onMouseDownHandler}
										onClick={onClearClick}
										visible={visible}
									/>
								}
							/>

							{addonAfterControl}
						</>
					) : (
						addonAfterControl
					)
				}
			/>
		);
	};

	return WithHasClear;
};
