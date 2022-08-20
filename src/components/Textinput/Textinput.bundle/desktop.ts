import { withRegistry } from '../../../lib/di';

import { compose, composeU, ExtractProps } from '../../../lib/compose';

import { Textinput as BaseTextinput } from '../Textinput@desktop';
import { TextinputDesktopRegistry } from '../Textinput.registry/desktop';
import { withModTextinputHasClear } from '../_hasClear/Textinput_hasClear';

// _view
import { withModTextinputViewDefault } from '../_view/Textinput_view_default';

// _size
import { withModTextinputSizeM } from '../_size/Textinput_size_m';

import { withModTextinputSizeS } from '../_size/Textinput_size_s';

export * from '../Textinput@desktop';

export const Textinput = compose(
	withRegistry(TextinputDesktopRegistry),
	composeU(withModTextinputViewDefault),
	composeU(withModTextinputSizeS, withModTextinputSizeM),
	withModTextinputHasClear,
)(BaseTextinput);

Textinput.defaultProps = { view: 'default', size: 'm' };

export type TextinputProps = ExtractProps<typeof Textinput>;
