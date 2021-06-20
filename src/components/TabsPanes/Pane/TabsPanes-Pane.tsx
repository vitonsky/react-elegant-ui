import React, { FC } from 'react';
import { IComponentHTMLElement } from '../../../types/IComponent';

import { cnTabsPanes } from '../TabsPanes';

import './TabsPanes-Pane.css';

export interface ITabsPanesPane extends IComponentHTMLElement {
	/**
	 * Hide pane content
	 */
	hidden?: boolean;
}

export const TabsPanesPane: FC<ITabsPanesPane> = ({
	hidden,
	className,
	children,
	...props
}) => (
	<div
		{...props}
		role="tabpanel"
		className={cnTabsPanes('Pane', { hidden }, [className])}
	>
		{children}
	</div>
);
