import React from 'react';
import { useComponentRegistry } from '@bem-react/di';

import { withHOCConstructor } from '../../../lib/compose';

import { cnSpinner, ISpinnerProps } from '../Spinner';

import '../Spinner.assets/Spinner-Spin.css';
import { ISpinnerIconRegistry } from '../Spinner.registry/features';
import './Spinner_view_icon.css';

export interface IModSpinnerViewIcon {
	view?: 'icon';
}

export const withModSpinnerViewIcon = withHOCConstructor<
	IModSpinnerViewIcon,
	ISpinnerProps
>(
	{ matchProps: { view: 'icon' }, privateMatchProps: true },
	(Component) => ({ view, className, ...props }) => {
		const { Icon } = useComponentRegistry<ISpinnerIconRegistry>(
			cnSpinner(),
		);

		return (
			<Component {...props} className={cnSpinner({ view }, [className])}>
				<Icon className={cnSpinner('Icon')} />
			</Component>
		);
	},
);
