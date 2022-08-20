import React, { Ref, useMemo, FC, ReactNode } from 'react';
import { cn } from '@bem-react/classname';
import { useComponentRegistry } from '../../lib/di';

import {
	IComponentHTMLElement,
	IComponentWithAddonNodes,
} from '../../types/IComponent';
import { mergeRefsAsCallback } from '../../lib/mergeRefs';

import { ITabsMenuRegistry } from './TabsMenu.registry';
import './TabsMenu.css';

/**
 * Interface for tab object
 */
export interface TabItem {
	/**
	 * Tab id
	 */
	id?: string;

	/**
	 * Disabled tab
	 */
	disabled?: boolean;

	/**
	 * Content of tab. For example text or link
	 */
	content?: ReactNode;
}

// NOTE: implement setting active tab by index (faster) OR id (flexibly)
export interface ITabsMenuProps
	extends IComponentHTMLElement<HTMLDivElement>,
		IComponentWithAddonNodes {
	/**
	 * Array of tab items.
	 */
	tabs: TabItem[];

	/**
	 * ID of active tab.
	 */
	activeTab?: string;

	/**
	 * Callback to tab switching
	 */
	setActiveTab?: (id: string) => void;

	/**
	 * Reference to active tab element
	 */
	activeTabRef?: Ref<HTMLLIElement>;

	/**
	 * Array of references to tabs elements
	 */
	tabsRef?: Ref<HTMLLIElement>[];

	/**
	 * Orientation of list a tabs (for acessability).
	 *
	 * @internal
	 * @default 'vertical'
	 */
	orientation?: 'horizontal' | 'vertical';
}

export const cnTabsMenu = cn('TabsMenu');

/**
 * Component to create menu.
 */
export const TabsMenu: FC<ITabsMenuProps> = ({
	activeTab,
	className,
	addonBefore,
	addonAfter,
	tabs,
	setActiveTab,
	activeTabRef,
	tabsRef,
	innerRef,
	orientation = 'vertical',
	...props
}) => {
	const { Tab, Container } = useComponentRegistry<ITabsMenuRegistry>(
		cnTabsMenu(),
	);

	const renderedTabs = useMemo(
		() =>
			tabs.map(({ id, disabled, content }, index) => {
				const onClick = () => {
					if (
						!disabled &&
						id !== undefined &&
						setActiveTab !== undefined
					) {
						setActiveTab(id);
					}
				};

				const isActiveTab = id === activeTab;

				const tabRef = mergeRefsAsCallback(
					(tabsRef || [])[index],
					isActiveTab ? activeTabRef : undefined,
				);

				return (
					<Tab
						innerRef={tabRef}
						first={index === 0}
						active={isActiveTab}
						disabled={disabled}
						onClick={onClick}
						key={id ? 'id:' + id : 'index:' + index}
					>
						{content}
					</Tab>
				);
			}),
		[Tab, tabs, activeTab, activeTabRef, tabsRef, setActiveTab],
	);

	return (
		<div
			{...props}
			aria-orientation={orientation}
			className={cnTabsMenu({}, [className])}
			ref={innerRef}
			role="tablist"
		>
			{addonBefore}
			<Container>{renderedTabs}</Container>
			{addonAfter}
		</div>
	);
};

TabsMenu.displayName = cnTabsMenu();
