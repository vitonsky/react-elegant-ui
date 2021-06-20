import { withClassnameHOC } from '../../../lib/compose';

import { cnTextinput } from '../Textinput';
import './Textinput_size_s.css';

export interface IModTextinputSizeS {
	size?: 's';
}

export const withModTextinputSizeS = withClassnameHOC<IModTextinputSizeS>(
	cnTextinput(),
	{ size: 's' },
);
