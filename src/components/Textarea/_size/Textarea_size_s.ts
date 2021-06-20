import { withClassnameHOC } from '../../../lib/compose';

import { cnTextarea } from '../Textarea';
import './Textarea_size_s.css';

export interface IModTextareaSizeS {
	size?: 's';
}

export const withModTextareaSizeS = withClassnameHOC<IModTextareaSizeS>(
	cnTextarea(),
	{ size: 's' },
);
