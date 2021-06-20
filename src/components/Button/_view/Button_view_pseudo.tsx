import { withClassnameHOC } from '../../../lib/compose';

import { cnButton } from '../Button';
import './Button_view_pseudo.css';

export interface IModButtonViewPseudo {
	view?: 'pseudo';
}

export const withModButtonViewPseudo = withClassnameHOC<IModButtonViewPseudo>(
	cnButton(),
	{ view: 'pseudo' },
);
