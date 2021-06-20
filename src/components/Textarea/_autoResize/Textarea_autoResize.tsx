import { withHOCConstructor } from '../../../lib/compose';

import { ITextareaProps } from '../Textarea';
import { withAutoResize } from '../Textarea.hocs/withAutoResize';

export interface IModTextareaAutoResize {
	autoResize?: boolean;
}

/**
 * Modifier for auto resize
 */
export const withModTextareaAutoResize = withHOCConstructor<
	IModTextareaAutoResize,
	ITextareaProps
>(
	{ matchProps: { autoResize: true }, matchOnlyProps: ['autoResize'] },
	withAutoResize,
);
