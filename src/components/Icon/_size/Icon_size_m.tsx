import { withClassnameHOC } from '../../../lib/compose';

import { cnIcon } from '../Icon';

import './Icon_size_m.css';

export interface IModIconSizeM {
	size?: 'm';
}

export const withModIconSizeM = withClassnameHOC<IModIconSizeM>(cnIcon(), {
	size: 'm',
});
