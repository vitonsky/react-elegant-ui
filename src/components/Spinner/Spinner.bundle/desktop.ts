import { withRegistry } from '../../../lib/di';

import { compose, composeU, ExtractProps } from '../../../lib/compose';

import { SpinnerDesktopRegistry } from '../Spinner.registry/desktop';
import { Spinner as BaseSpinner } from '../Spinner@desktop';

// _view
import { withModSpinnerViewPrimitive } from '../_view/Spinner_view_primitive';
import { withModSpinnerViewIcon } from '../_view/Spinner_view_icon';

// _position
import { withModSpinnerPositionCenter } from '../_position/Spinner_position_center';

// _size
import { withModSpinnerSizeS } from '../_size/Spinner_size_s';
import { withModSpinnerSizeM } from '../_size/Spinner_size_m';
import { withModSpinnerSizeL } from '../_size/Spinner_size_l';

export * from '../Spinner@desktop';

export const Spinner = compose(
	withRegistry(SpinnerDesktopRegistry),
	composeU(withModSpinnerSizeS, withModSpinnerSizeM, withModSpinnerSizeL),
	composeU(withModSpinnerViewPrimitive, withModSpinnerViewIcon),
	composeU(withModSpinnerPositionCenter),
)(BaseSpinner);

Spinner.defaultProps = { view: 'primitive', size: 'm' };

export type ISpinnerProps = ExtractProps<typeof Spinner>;
