import { withClassnameHOC } from '../../../lib/compose';

import { cnTextinput } from '../Textinput';
import './Textinput_size_m.css';

export interface IModTextinputSizeM {
	size?: 'm';
}

export const withModTextinputSizeM = withClassnameHOC<IModTextinputSizeM>(
	cnTextinput(),
	{ size: 'm' },
);
