import React, { createContext, FC, useCallback, useContext } from 'react';
import { useComponentRegistry } from '@bem-react/di';
import { PressEvents } from '@react-types/shared';

import { IComponentHTMLElement } from '../../../types/IComponent';

import { ISelectButtonTriggerRegistry } from '../Select.registry/features';
import { cnSelect } from '../Select';
import './Select-Trigger.css';
import '../TriggerIconContainer/Select-TriggerIconContainer.css';
import '../TriggerIcon/Select-TriggerIcon.css';

/**
 * Minimal interface required for any trigger component
 */
export interface ISelectTrigger extends IComponentHTMLElement, PressEvents {
	/**
	 * Make element unavailable
	 */
	disabled?: boolean;
}

export const SelectTriggerContext = createContext<ISelectTrigger>({});

/**
 * Basic implementation of select trigger
 *
 * You can replace it to anything other
 */
export const SelectTrigger: FC<ISelectTrigger> = ({ className, ...props }) => {
	const { Button, Icon } = useComponentRegistry<ISelectButtonTriggerRegistry>(
		cnSelect(),
	);

	const ctx = useContext(SelectTriggerContext);

	const iconProvider = useCallback(
		(className) => (
			<span className={cnSelect('TriggerIconContainer')}>
				<Icon className={cnSelect('TriggerIcon', [className])} />
			</span>
		),
		[Icon],
	);

	return (
		<Button
			as="button"
			{...ctx}
			{...props}
			className={cnSelect('Trigger', [className, ctx.className])}
			iconRight={iconProvider}
		/>
	);
};
