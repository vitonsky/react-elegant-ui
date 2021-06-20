import React, { FC } from 'react';
import { useComponentRegistry } from '@bem-react/di';

import {
	IComponentHTMLElement,
	IComponentWithAddonNodes,
} from '../../../types/IComponent';

import { IMenuRegistry } from '../Menu.registry';
import { cnMenu } from '../Menu';
import './Menu-ItemContent.css';

export interface IItemContent<T extends HTMLElement = HTMLDivElement>
	extends IComponentHTMLElement<T>,
		IComponentWithAddonNodes {
	/**
	 * Don't apply default styles
	 *
	 * It useful for unusual custom content
	 */
	raw?: boolean;
}

export const ItemContent: FC<IItemContent> = ({
	className,
	children,
	raw,
	innerRef,
	addonBefore,
	addonAfter,
	...props
}) => {
	const { ItemText } = useComponentRegistry<IMenuRegistry>(cnMenu());

	return (
		<div
			{...props}
			className={cnMenu('ItemContent', { raw }, [className])}
			ref={innerRef}
		>
			{addonBefore}
			{raw ? children : <ItemText>{children}</ItemText>}
			{addonAfter}
		</div>
	);
};
