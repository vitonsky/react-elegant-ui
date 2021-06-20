import { withClassnameHOC } from '../../../lib/compose';

import { cnMenu } from '../Menu';
import './Menu_size_s.css';

export interface IModMenuSizeS {
	size?: 's';
}

export const withModMenuSizeS = withClassnameHOC<IModMenuSizeS>(cnMenu(), {
	size: 's',
});
