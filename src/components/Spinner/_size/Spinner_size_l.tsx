import { withClassnameHOC } from '../../../lib/compose';

import { cnSpinner } from '../Spinner';

import './Spinner_size_l.css';

export interface IModSpinnerSizeL {
	size?: 'l';
}

export const withModSpinnerSizeL = withClassnameHOC<IModSpinnerSizeL>(
	cnSpinner(),
	{ size: 'l' },
);
