import { ComponentType } from 'react';

import { ITextinputWrap } from '../Wrap/Textinput-Wrap';
import { ITextinputControl } from '../Control/Textinput-Control';
import { ITextinputBox } from '../Box/Textinput-Box';
import { ITextinputHint } from '../Hint/Textinput-Hint';
import { ITextinputIcon } from '../Icon/Textinput-Icon';

export interface ITextinputRegistry {
	Wrap: ComponentType<ITextinputWrap>;
	Control: ComponentType<ITextinputControl>;
	Box: ComponentType<ITextinputBox>;
	Hint: ComponentType<ITextinputHint>;
	Icon: ComponentType<ITextinputIcon>;
}
