import React, { FC } from 'react';
import { useComponentRegistry } from '../../../lib/di';

import { IComponentHTMLElement } from '../../../types/IComponent';

import { IMenuSelectedItemRegistry } from '../Menu.registry/features';
import { cnMenu } from '../Menu';
import './Menu-ItemTick.css';

export interface IItemTick<T extends HTMLElement = HTMLDivElement>
	extends IComponentHTMLElement<T> {
	/**
	 * Show icon
	 */
	checked?: boolean;
}

export const ItemTick: FC<IItemTick> = ({
	checked,
	className,
	innerRef,
	...props
}) => {
	const { ItemIcon } = useComponentRegistry<IMenuSelectedItemRegistry>(
		cnMenu(),
	);

	return (
		<ItemIcon
			{...props}
			glyph={checked ? 'check' : undefined}
			className={cnMenu('ItemTick', [className])}
			innerRef={innerRef}
		/>
	);
};
