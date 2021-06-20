import React, { FC, HTMLAttributes } from 'react';
import { useComponentRegistry } from '@bem-react/di';

import { cnTextinput } from '../Textinput';
import { ITextinputClearRegistry } from '../Textinput.registry/features';

import './Textinput-Clear.css';

export const cnClear = cnTextinput('Clear');

export interface ITextinputClear extends HTMLAttributes<HTMLElement> {
	className?: string;
	visible?: boolean;
}

export const TextinputClear: FC<ITextinputClear> = ({
	className,
	visible,
	children,
	...props
}) => {
	const { ClearIcon } = useComponentRegistry<ITextinputClearRegistry>(
		cnTextinput(),
	);

	return (
		<ClearIcon
			{...props}
			className={cnTextinput('Clear', { visible }, [className])}
		/>
	);
};
