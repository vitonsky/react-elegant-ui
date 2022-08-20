import React, { FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';
import { useComponentRegistry } from '../../lib/di';

import { IComponentHTMLElement } from '../../types/IComponent';
import { useEqualMemo } from '../../hooks/useEqualMemo';

import { ITabsPanesRegistry } from './TabsPanes.registry';

export interface PaneItem {
	/**
	 * Unique id of tab
	 *
	 * If exists few items with same id, will shown only first matched item
	 */
	id?: string;

	/**
	 * Content of tab
	 */
	content?: ReactNode;

	/**
	 * Inactive state of tab
	 */
	disabled?: boolean;
}

export interface ITabsPanesProps extends IComponentHTMLElement<HTMLDivElement> {
	/**
	 * Array of tabs.
	 */
	panes: PaneItem[];

	/**
	 * ID of active tab.
	 */
	activePane?: string;

	/**
	 * Render all tabs, even inactive
	 *
	 * It useful when you need keep state of panes content and for SEO purposes
	 */
	renderAll?: boolean;
}

export const cnTabsPanes = cn('TabsPanes');

/**
 * Component for making tabs with some contents.
 * Switching between tabs can be implement for example with use `TabsMenu`, `Select`.
 *
 * @param {ITabsPanesProps} props
 */
export const TabsPanes: FC<ITabsPanesProps> = ({
	panes,
	activePane,
	renderAll,
	className,
	innerRef,
	...props
}) => {
	const { Pane } = useComponentRegistry<ITabsPanesRegistry>(cnTabsPanes());

	// Render panes
	const content = useEqualMemo(() => {
		// Select first matched pane
		const activePaneIndex = panes.findIndex(
			({ id, disabled }) => id === activePane && !disabled,
		);

		// TODO: write to docs about dev mode
		if (process.env.NODE_ENV !== 'production') {
			if (activePaneIndex === -1) {
				console.warn(
					`Pane with id "${activePane}" is not found in list of panes`,
				);
			}
		}

		if (renderAll) {
			// Render all panes and hide inactive
			return panes.map((pane, index) => {
				const { disabled, content } = pane;
				const isHidden = disabled || index !== activePaneIndex;

				return (
					<Pane key={index} hidden={isHidden}>
						{content}
					</Pane>
				);
			});
		} else {
			// Render only active pane
			const pane = panes[activePaneIndex];

			// Render nothing
			if (pane === undefined || pane.disabled) {
				return undefined;
			}

			return <Pane>{pane.content}</Pane>;
		}
	}, [Pane, panes, activePane, renderAll]);

	return (
		<div
			role="tabpanel"
			{...props}
			ref={innerRef}
			className={cnTabsPanes({}, [className])}
		>
			{content}
		</div>
	);
};

TabsPanes.displayName = cnTabsPanes();
