import React, { FC } from 'react';
import { useComponentRegistry } from '../../../lib/di';

import { IComponentHTMLElement } from '../../../types/IComponent';

import { ICheckboxRegistry } from '../Checkbox.registry';
import { cnCheckbox } from '../Checkbox';

import './Checkbox-Tick.css';

export interface ICheckboxTick extends IComponentHTMLElement<HTMLDivElement> {
	indeterminate?: boolean;
}

export const CheckboxTick: FC<ICheckboxTick> = ({
	innerRef,
	className,
	indeterminate,
	...props
}) => {
	const { Icon } = useComponentRegistry<ICheckboxRegistry>(cnCheckbox());
	return (
		<div
			{...props}
			ref={innerRef}
			className={cnCheckbox('Tick', [className])}
		>
			<Icon
				className={cnCheckbox('Icon')}
				glyph={indeterminate ? 'minus-thick' : 'check-thick'}
				scalable
			/>
		</div>
	);
};
