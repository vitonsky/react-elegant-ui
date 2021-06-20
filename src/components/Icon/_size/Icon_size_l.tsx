import { withClassnameHOC } from '../../../lib/compose';

import { cnIcon } from '../Icon';

import './Icon_size_l.css';

export interface IModIconSizeL {
	size?: 'l';
}

export const withModIconSizeL = withClassnameHOC<IModIconSizeL>(cnIcon(), {
	size: 'l',
});
