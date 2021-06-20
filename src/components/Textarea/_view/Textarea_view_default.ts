import { withClassnameHOC } from '../../../lib/compose';

import { cnTextarea } from '../Textarea';
import './Textarea_view_default.css';

export interface IModTextareaViewDefault {
	view?: 'default';
}

export const withModTextareaViewDefault = withClassnameHOC<IModTextareaViewDefault>(
	cnTextarea(),
	{ view: 'default' },
);
