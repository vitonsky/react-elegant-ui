import React, {
	ComponentType,
	createRef,
	FC,
	useCallback,
	useMemo,
	useState,
} from 'react';

import { makeChain } from '../../lib/makeChain';
import { mergeRefsAsCallback } from '../../lib/mergeRefs';
import { withFocusVisible } from '../../hocs/withFocusVisible';
import { useKeyboardNavigation } from '../../hooks/behavior/useKeyboardNavigation';

import {
	TabsMenu as TabsMenuBase,
	ITabsMenuProps,
	cnTabsMenu,
} from './TabsMenu';

export * from './TabsMenu';

export interface ITabsMenuDesktopProps extends ITabsMenuProps {
	/**
	 * When true - switching will infinite
	 */
	loopSwitching?: boolean;
}

export const withKeyboardNavigation = (
	BaseComponent: ComponentType<ITabsMenuProps>,
): FC<ITabsMenuDesktopProps> => ({ loopSwitching, ...props }) => {
	const {
		tabs,
		activeTab,
		setActiveTab,
		orientation = 'vertical',
		tabsRef: tabsRefExternal,
		onFocusCapture: onFocusCaptureExternal,
		onBlurCapture: onBlurCaptureExternal,
	} = props;

	// Local refs
	const tabsRef = useMemo(() => tabs.map(() => createRef<HTMLLIElement>()), [
		tabs,
	]);

	const activeTabIndex = useMemo(() => {
		for (let i = 0; i < tabs.length; i++) {
			if (tabs[i].id === activeTab) {
				return i;
			}
		}

		return -1;
	}, [tabs, activeTab]);

	const setActiveTabByIndex = useCallback(
		(index: number) => {
			const tab = tabs[index];

			// Skip when can't found tab by index
			if (tab === undefined) return;

			// Focus on tab
			const tabRef = tabsRef[index];
			if (tabRef !== undefined && tabRef.current !== null) {
				tabRef.current.focus();
			}

			if (tab.id !== undefined && setActiveTab !== undefined) {
				setActiveTab(tab.id);
			}
		},
		[tabs, tabsRef, setActiveTab],
	);

	const [isFocused, setIsFocused] = useState(false);

	useKeyboardNavigation({
		enabled: isFocused,
		items: tabs,
		cursor: activeTabIndex,
		setCursor: setActiveTabByIndex,
		direction: [orientation],
		loop: loopSwitching,
	});

	// Merge local and external refs
	const tabsRefMix = useMemo(
		() =>
			tabsRefExternal === undefined
				? tabsRef
				: tabsRef.map((_, index) =>
					mergeRefsAsCallback(
						tabsRefExternal[index],
						tabsRef[index],
					),
				  ),
		[tabsRefExternal, tabsRef],
	);

	// Merge handlers
	const { onFocusCapture, onBlurCapture } = useMemo(
		() => ({
			onFocusCapture: makeChain(onFocusCaptureExternal, () =>
				setIsFocused(true),
			),
			onBlurCapture: makeChain(onBlurCaptureExternal, () =>
				setIsFocused(false),
			),
		}),
		[onFocusCaptureExternal, onBlurCaptureExternal, setIsFocused],
	);

	return (
		<BaseComponent
			{...props}
			tabsRef={tabsRefMix}
			onFocusCapture={onFocusCapture}
			onBlurCapture={onBlurCapture}
		/>
	);
};

export const TabsMenuDesktop = withKeyboardNavigation(TabsMenuBase);
export const TabsMenu = withFocusVisible(cnTabsMenu())(TabsMenuDesktop);
