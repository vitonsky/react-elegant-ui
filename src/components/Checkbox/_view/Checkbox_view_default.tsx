import { withClassnameHOC } from '../../../lib/compose';

import { cnCheckbox } from '../Checkbox';

import './Checkbox_view_default.css';

export interface IModCheckboxViewDefault {
	view?: 'default';
}

export const withModCheckboxViewDefault = withClassnameHOC<IModCheckboxViewDefault>(
	cnCheckbox(),
	{
		view: 'default',
	},
);
