import { withClassnameHOC } from '../../../lib/compose';

import { cnButton } from '../Button';
import './Button_size_m.css';

export interface IModButtonSizeM {
	size?: 'm';
}

export const withModButtonSizeM = withClassnameHOC<IModButtonSizeM>(
	cnButton(),
	{
		size: 'm',
	},
);
