import { withClassnameHOC } from '../../../lib/compose';

import { cnSpinner } from '../Spinner';

import './Spinner_size_m.css';

export interface IModSpinnerSizeM {
	size?: 'm';
}

export const withModSpinnerSizeM = withClassnameHOC<IModSpinnerSizeM>(
	cnSpinner(),
	{ size: 'm' },
);
