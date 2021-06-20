import { withClassnameHOC } from '../../../lib/compose';

import { cnMenu } from '../Menu';
import './Menu_size_l.css';

export interface IModMenuSizeL {
	size?: 'l';
}

export const withModMenuSizeL = withClassnameHOC<IModMenuSizeL>(cnMenu(), {
	size: 'l',
});
