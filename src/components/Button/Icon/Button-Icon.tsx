import { FC } from 'react';

import { IconProvider } from '../../Icon';

import { cnButton } from '../Button';
import './Button-Icon.css';

export interface IButtonIcon {
	side?: 'left' | 'right';
	provider: IconProvider;
	className?: string;
}

export const ButtonIcon: FC<IButtonIcon> = ({ side, provider, ...props }) => {
	const className = cnButton('Icon', { side }, [props.className]);

	return provider(className);
};
