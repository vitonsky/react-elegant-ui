import { withClassnameHOC } from '../../../lib/compose';

import { cnButton } from '../Button';
import './Button_pressAnimation.css';

export interface IModButtonPressAnimation {
	pressAnimation?: boolean;
}

export const withModButtonPressAnimation = withClassnameHOC<IModButtonPressAnimation>(
	cnButton(),
	{
		pressAnimation: true,
	},
);
