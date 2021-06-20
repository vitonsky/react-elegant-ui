import { ComponentType } from 'react';

import { ITextareaWrap } from '../Wrap/Textarea-Wrap';
import { ITextareaControl } from '../Control/Textarea-Control';
import { ITextareaBox } from '../Box/Textarea-Box';
import { ITextareaHint } from '../Hint/Textarea-Hint';

export interface ITextareaRegistry {
	Wrap: ComponentType<ITextareaWrap>;
	Control: ComponentType<ITextareaControl>;
	Box: ComponentType<ITextareaBox>;
	Hint: ComponentType<ITextareaHint>;
}
