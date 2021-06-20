import { ComponentType } from 'react';

import { IComponentHTMLElement } from '../../../types/IComponent';
import { ITextareaClear } from '../Clear/Textarea-Clear';

export interface ITextareaClearRegistry<
	T extends {
		ClearIcon: HTMLElement;
		Clear: HTMLElement;
	} = {
		ClearIcon: HTMLElement;
		Clear: HTMLElement;
	}
> {
	ClearIcon: ComponentType<IComponentHTMLElement<T['ClearIcon']>>;
	Clear: ComponentType<ITextareaClear<T['Clear']>>;
}
