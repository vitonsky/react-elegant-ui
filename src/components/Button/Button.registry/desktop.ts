import { Registry } from '@bem-react/di';

import { IButtonRegistry } from '.';
import { cnButton } from '../Button';

import { ButtonContent } from '../Content/Button-Content';
import { ButtonText } from '../Text/Button-Text';
import { ButtonIcon } from '../Icon/Button-Icon';

export { IButtonRegistry as IButtonDesktopRegistry } from '.';

export const regObjects: IButtonRegistry = {
	Content: ButtonContent,
	Text: ButtonText,
	Icon: ButtonIcon,
};

export const ButtonDesktopRegistry = new Registry({ id: cnButton() }).fill(
	regObjects as any,
);
