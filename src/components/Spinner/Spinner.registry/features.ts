import { FC } from 'react';

import { ISpinnerIcon } from '../Icon/Spinner-Icon';

export interface ISpinnerIconRegistry {
	IconComponent: FC<ISpinnerIcon>;
	Icon: FC<ISpinnerIcon>;
}
