import { withClassnameHOC } from '../../../lib/compose';

import { cnTextinput } from '../Textinput';
import './Textinput_view_default.css';

export interface IModTextinputViewDefault {
	view?: 'default';
}

export const withModTextinputViewDefault = withClassnameHOC<IModTextinputViewDefault>(
	cnTextinput(),
	{ view: 'default' },
);
