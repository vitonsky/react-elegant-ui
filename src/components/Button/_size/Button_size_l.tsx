import { withClassnameHOC } from '../../../lib/compose';

import { cnButton } from '../Button';
import './Button_size_l.css';

export interface IModButtonSizeL {
	size?: 'l';
}

export const withModButtonSizeL = withClassnameHOC<IModButtonSizeL>(
	cnButton(),
	{
		size: 'l',
	},
);
