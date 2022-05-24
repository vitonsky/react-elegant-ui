import React, { useMemo } from 'react';

import { withHOCConstructor } from '../../../lib/compose';

import { cnButton, IButtonProps } from '../Button';
import './Button_pressAnimation.css';

export interface IModButtonPressAnimation {
	pressAnimation?: boolean;
}

export const createModButtonPressAnimation = <
	T extends IButtonProps & Record<string, any> = any,
>(
		isEnabled: (props: T) => boolean,
	) =>
		withHOCConstructor<IModButtonPressAnimation, IButtonProps>(
			{
				matchProps: { pressAnimation: true },
				matchOnlyProps: ['pressAnimation'],
			},
			(Component) => (props) => {
				const pressAnimation = useMemo(
					() => isEnabled(props as any),
					[props],
				);
				return (
					<Component
						{...props}
						className={cnButton({ pressAnimation }, [props.className])}
					/>
				);
			},
		);

export const withModButtonPressAnimation = createModButtonPressAnimation(
	// disable for some views
	(props) => ['link'].indexOf(props.view) === -1,
);
