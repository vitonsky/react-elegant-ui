import { withClassnameHOC } from '../../../lib/compose';

import { cnTextarea } from '../Textarea';
import './Textarea_size_m.css';

export interface IModTextareaSizeM {
	size?: 'm';
}

export const withModTextareaSizeM = withClassnameHOC<IModTextareaSizeM>(
	cnTextarea(),
	{ size: 'm' },
);
