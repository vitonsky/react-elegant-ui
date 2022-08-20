import React, { FC } from 'react';
import { useComponentRegistry } from '../../../lib/di';

import { ISpinnerIconRegistry } from '../Spinner.registry/features';
import { cnSpinner } from '../Spinner';
import './Spinner-Icon.css';

export interface ISpinnerIcon extends React.SVGProps<SVGSVGElement> {}

export const SpinnerIcon: FC<ISpinnerIcon> = ({ className, ...props }) => {
	const { IconComponent } = useComponentRegistry<ISpinnerIconRegistry>(
		cnSpinner(),
	);

	return (
		<IconComponent {...props} className={cnSpinner('Icon', [className])} />
	);
};
