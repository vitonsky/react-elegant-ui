import { withClassnameHOC } from '../../../lib/compose';

import { cnSpinner } from '../Spinner';

import '../Spinner.assets/Spinner-Spin.css';
import './Spinner_view_primitive.css';

export interface IModSpinnerViewPrimitive {
	view?: 'primitive';
}

export const withModSpinnerViewPrimitive = withClassnameHOC<IModSpinnerViewPrimitive>(
	cnSpinner(),
	{ view: 'primitive' },
);
