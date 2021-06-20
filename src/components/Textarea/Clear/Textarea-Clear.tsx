import React, { FC } from 'react';
import { useComponentRegistry } from '@bem-react/di';

import { IComponentHTMLElement } from '../../../types/IComponent';

import { ITextareaClearRegistry } from '../Textarea.registry/features';
import { cnTextarea } from '../Textarea';
import './Textarea-Clear.css';

export const cnClear = cnTextarea('Clear');

export interface ITextareaClear<T extends HTMLElement = HTMLElement>
	extends IComponentHTMLElement<T> {
	visible?: boolean;
}

export const TextareaClear: FC<ITextareaClear> = ({
	visible,
	className,
	...props
}) => {
	const { ClearIcon } = useComponentRegistry<ITextareaClearRegistry>(
		cnTextarea(),
	);

	return (
		<ClearIcon
			{...props}
			className={cnTextarea('Clear', { visible }, [className])}
		/>
	);
};
