import { withRegistry } from '../../../lib/di';

import { compose, composeU, ExtractProps } from '../../../lib/compose';

import { Checkbox as BaseCheckbox } from '../Checkbox@desktop';

import { CheckboxDesktopRegistry } from '../Checkbox.registry/desktop';

// _multiline
import { withModCheckboxMultiline } from '../_multiline/Checkbox_multiline';

// _view
import { withModCheckboxViewDefault } from '../_view/Checkbox_view_default@desktop';

// _size
import { withModCheckboxSizeM } from '../_size/Checkbox_size_m';
import { withModCheckboxSizeS } from '../_size/Checkbox_size_s';

export * from '../Checkbox@desktop';

export const Checkbox = compose(
	withRegistry(CheckboxDesktopRegistry),
	withModCheckboxMultiline,
	composeU(withModCheckboxViewDefault),
	composeU(withModCheckboxSizeM, withModCheckboxSizeS),
)(BaseCheckbox);

Checkbox.defaultProps = {
	view: 'default',
	size: 'm',
};

export type ICheckboxProps = ExtractProps<typeof Checkbox>;
