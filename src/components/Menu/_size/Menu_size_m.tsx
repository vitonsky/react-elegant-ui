import { withClassnameHOC } from '../../../lib/compose';

import { cnMenu } from '../Menu';
import './Menu_size_m.css';

export interface IModMenuSizeM {
	size?: 'm';
}

export const withModMenuSizeM = withClassnameHOC<IModMenuSizeM>(cnMenu(), {
	size: 'm',
});
