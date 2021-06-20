import React, { FC } from 'react';
import { cn } from '@bem-react/classname';

import { IComponentHTMLElement } from '../../types/IComponent';

export interface ISpinnerProps<T extends HTMLElement = HTMLDivElement>
	extends IComponentHTMLElement<T> {
	progress?: boolean;
}

export const cnSpinner = cn('Spinner');

export const Spinner: FC<ISpinnerProps> = ({
	progress,
	className,
	innerRef,
	...props
}) => {
	return (
		<div
			{...props}
			ref={innerRef}
			className={cnSpinner({ progress }, [className])}
		/>
	);
};
