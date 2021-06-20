import { cloneElement, FC, ReactElement } from 'react';

import { cnTextinput } from '../Textinput';
import './Textinput-Icon.css';

export interface ITextinputIcon {
	side?: 'left' | 'right';
	component: ReactElement;
}

/**
 * Icon provider for make abstracion for component
 */
export const TextinputIcon: FC<ITextinputIcon> = ({
	component,
	side,
	...props
}) =>
	cloneElement(component, {
		...props,
		className: cnTextinput('Icon', { side }, [component.props.className]),
	});
