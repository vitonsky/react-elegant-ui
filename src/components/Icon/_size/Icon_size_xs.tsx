import { withClassnameHOC } from '../../../lib/compose';

import { cnIcon } from '../Icon';

import './Icon_size_xs.css';

export interface IModIconSizeXS {
	size?: 'xs';
}

export const withModIconSizeXS = withClassnameHOC<IModIconSizeXS>(cnIcon(), {
	size: 'xs',
});
