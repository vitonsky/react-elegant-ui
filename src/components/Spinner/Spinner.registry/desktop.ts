import { ISpinnerIconRegistry } from './features';

import IconComponent from '../Spinner.assets/fidget-spinner/fidget-spinner.svg';
import { SpinnerIcon } from '../Icon/Spinner-Icon';
import { Registry } from '@bem-react/di';
import { cnSpinner } from '../Spinner';

export interface ISpinnerDesktopRegistry extends ISpinnerIconRegistry {}

export const regObjects: ISpinnerDesktopRegistry = {
	IconComponent,
	Icon: SpinnerIcon,
};

export const SpinnerDesktopRegistry = new Registry({ id: cnSpinner() }).fill(
	regObjects as any,
);
