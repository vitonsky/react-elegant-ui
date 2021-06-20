import { withClassnameHOC } from '../../../lib/compose';

import { cnSpinner } from '../Spinner';

import './Spinner_position_center.css';

export interface IModSpinnerPositionCenter {
	position?: 'center';
}

export const withModSpinnerPositionCenter = withClassnameHOC<IModSpinnerPositionCenter>(
	cnSpinner(),
	{ position: 'center' },
);
