import { ComponentType, HTMLAttributes } from 'react';

import { ITextinputClear } from '../Clear/Textinput-Clear';

export interface ITextinputClearRegistry {
	ClearIcon: ComponentType<HTMLAttributes<HTMLElement>>;
	Clear: ComponentType<ITextinputClear>;
}
