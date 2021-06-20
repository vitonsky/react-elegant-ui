import { ComponentType } from 'react';

import { IButtonContent } from '../Content/Button-Content';
import { IButtonText } from '../Text/Button-Text';
import { IButtonIcon } from '../Icon/Button-Icon';

export interface IButtonRegistry {
	Content: ComponentType<IButtonContent>;
	Text: ComponentType<IButtonText>;
	Icon: ComponentType<IButtonIcon>;
}
