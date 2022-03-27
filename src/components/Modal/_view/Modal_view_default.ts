import { withClassnameHOC } from '../../../lib/compose';

import { cnModal } from '../Modal';

import './Modal_view_default.css';

export interface IModModalViewDefault {
	view?: 'default';
}

export const withModModalViewDefault = withClassnameHOC<IModModalViewDefault>(
	cnModal(),
	{
		view: 'default',
	},
);
