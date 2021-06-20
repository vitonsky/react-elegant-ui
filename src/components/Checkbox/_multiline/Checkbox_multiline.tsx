import { withClassnameHOC } from '../../../lib/compose';

import { cnCheckbox } from '../Checkbox';

import './Checkbox_multiline.css';

export interface IModCheckboxMultiline {
	multiline?: boolean;
}

export const withModCheckboxMultiline = withClassnameHOC<IModCheckboxMultiline>(
	cnCheckbox(),
	{
		multiline: true,
	},
);
