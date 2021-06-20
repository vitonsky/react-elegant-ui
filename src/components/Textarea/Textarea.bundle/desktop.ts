import { withRegistry } from '@bem-react/di';

import { compose, composeU, ExtractProps } from '../../../lib/compose';

import { Textarea as BaseTextarea } from '../Textarea@desktop';
import { TextareaRegistry } from '../Textarea.registry/desktop';
import { withModTextareaAutoResize } from '../_autoResize/Textarea_autoResize';
import { withModTextareaHasClear } from '../_hasClear/Textarea_hasClear';

// _view
import { withModTextareaViewDefault } from '../_view/Textarea_view_default';

// _size
import { withModTextareaSizeS } from '../_size/Textarea_size_s';
import { withModTextareaSizeM } from '../_size/Textarea_size_m';

export * from '../Textarea@desktop';

export const Textarea = compose(
	withRegistry(TextareaRegistry),
	composeU(withModTextareaSizeM, withModTextareaSizeS),
	composeU(withModTextareaViewDefault),
	withModTextareaHasClear,
	withModTextareaAutoResize,
)(BaseTextarea);

Textarea.defaultProps = { view: 'default', size: 'm' };

export type TextareaProps = ExtractProps<typeof Textarea>;
