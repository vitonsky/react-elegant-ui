import { withRegistry } from '@bem-react/di';

import { compose, composeU, ExtractProps } from '../../../lib/compose';

import { Button as DesktopButton } from '../Button@desktop';
import { ButtonDesktopRegistry } from '../Button.registry/desktop';

// Mods
import { withModButtonTypeLink } from '../_type/Button_type_link';
import { withModButtonPressAnimation } from '../_pressAnimation/Button_pressAnimation';

// _view
import { withModButtonViewDefault } from '../_view/Button_view_default';
import { withModButtonViewAction } from '../_view/Button_view_action';
import { withModButtonViewPseudo } from '../_view/Button_view_pseudo';
import { withModButtonViewClear } from '../_view/Button_view_clear';

// _size
import { withModButtonSizeS } from '../_size/Button_size_s';
import { withModButtonSizeM } from '../_size/Button_size_m';
import { withModButtonSizeL } from '../_size/Button_size_l';

// _width
import { withModButtonWidthMax } from '../_width/Button_width_max';

export * from '../Button@desktop';

export const Button = compose(
	withRegistry(ButtonDesktopRegistry),
	withModButtonPressAnimation,
	composeU(
		withModButtonViewDefault,
		withModButtonViewAction,
		withModButtonViewPseudo,
		withModButtonViewClear,
	),
	composeU(withModButtonSizeS, withModButtonSizeM, withModButtonSizeL),
	composeU(withModButtonWidthMax),
	composeU(withModButtonTypeLink),
)(DesktopButton);

Button.defaultProps = { size: 'm', view: 'default', pressAnimation: true };

export type IButtonProps = ExtractProps<typeof Button>;
