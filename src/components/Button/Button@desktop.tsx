import { Button as ButtonCommon, cnButton } from './Button';

import { withFocusVisible } from '../../hocs/withFocusVisible';

import './Button@desktop.css';

export * from './Button';

export const Button = withFocusVisible(cnButton())(ButtonCommon);

Button.displayName = cnButton();
