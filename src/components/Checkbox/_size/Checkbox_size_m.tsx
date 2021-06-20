import { withClassnameHOC } from '../../../lib/compose';

import { cnCheckbox } from '../Checkbox';

import './Checkbox_size_m.css';

export interface IModCheckboxSizeM {
	size?: 'm';
}

export const withModCheckboxSizeM = withClassnameHOC<IModCheckboxSizeM>(
	cnCheckbox(),
	{
		size: 'm',
	},
);
