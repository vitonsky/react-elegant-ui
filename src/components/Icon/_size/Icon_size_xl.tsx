import { withClassnameHOC } from '../../../lib/compose';

import { cnIcon } from '../Icon';

import './Icon_size_xl.css';

export interface IModIconSizeXL {
	size?: 'xl';
}

export const withModIconSizeXL = withClassnameHOC<IModIconSizeXL>(cnIcon(), {
	size: 'xl',
});
