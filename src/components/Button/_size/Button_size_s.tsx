import { withClassnameHOC } from '../../../lib/compose';

import { cnButton } from '../Button';
import './Button_size_s.css';

export interface IModButtonSizeS {
	size?: 's';
}

export const withModButtonSizeS = withClassnameHOC<IModButtonSizeS>(
	cnButton(),
	{
		size: 's',
	},
);
