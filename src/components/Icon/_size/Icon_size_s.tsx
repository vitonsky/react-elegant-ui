import { withClassnameHOC } from '../../../lib/compose';

import { cnIcon } from '../Icon';

import './Icon_size_s.css';

export interface IModIconSizeS {
	size?: 's';
}

export const withModIconSizeS = withClassnameHOC<IModIconSizeS>(cnIcon(), {
	size: 's',
});
