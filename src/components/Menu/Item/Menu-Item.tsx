import React, { FC, HTMLAttributes, Ref } from 'react';
import { useComponentRegistry } from '@bem-react/di';

import { IComponentHTMLElement } from '../../../types/IComponent';
import { useRefHost } from '../../../hooks/useRefHost';
import { useUniqueId } from '../../../hooks/useUniqueId';

import { IMenuRegistry } from '../Menu.registry';
import { cnMenu } from '../Menu';
import './Menu-Item.css';

export interface IMenuItem<T extends HTMLElement = HTMLDivElement>
	extends IComponentHTMLElement<T> {
	/**
	 *	Make item unavailable
	 */
	disabled?: boolean;

	/**
	 * Don't show item
	 */
	hidden?: boolean;

	/**
	 * Draw cursor on item
	 */
	cursor?: boolean;

	/**
	 * Don't apply default styles
	 *
	 * It useful for unusual custom content
	 */
	raw?: boolean;

	/**
	 * Ref to `id` property
	 *
	 * It useful to handle `id` property avoid use ref to DOM node
	 */
	idRef?: Ref<string>;

	/**
	 * Addon props
	 */
	addonProps?: HTMLAttributes<T>;
}

export const MenuItem: FC<IMenuItem> = ({
	id,
	idRef,
	className,
	children,
	disabled,
	hidden,
	cursor,
	raw,
	innerRef,
	addonProps,
	...props
}) => {
	const uid = useUniqueId('item');
	const actualId = id ?? uid;

	useRefHost(idRef, actualId);

	const { ItemText } = useComponentRegistry<IMenuRegistry>(cnMenu());

	return (
		<div
			id={actualId}
			role="option"
			{...addonProps}
			{...props}
			className={cnMenu('Item', { disabled, hidden, raw, cursor }, [
				className,
				addonProps?.className,
			])}
			ref={innerRef}
		>
			{raw ? children : <ItemText>{children}</ItemText>}
		</div>
	);
};
