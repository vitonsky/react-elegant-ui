import { withClassnameHOC } from '../../../lib/compose';

import { cnCheckbox } from '../Checkbox';

import './Checkbox_size_s.css';

export interface IModCheckboxSizeS {
	size?: 's';
}

export const withModCheckboxSizeS = withClassnameHOC<IModCheckboxSizeS>(
	cnCheckbox(),
	{
		size: 's',
	},
);
