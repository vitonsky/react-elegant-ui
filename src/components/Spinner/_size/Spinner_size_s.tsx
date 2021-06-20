import { withClassnameHOC } from '../../../lib/compose';

import { cnSpinner } from '../Spinner';

import './Spinner_size_s.css';

export interface IModSpinnerSizeS {
	size?: 's';
}

export const withModSpinnerSizeS = withClassnameHOC<IModSpinnerSizeS>(
	cnSpinner(),
	{ size: 's' },
);
