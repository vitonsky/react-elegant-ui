import React, { useEffect, useMemo, useRef, useState } from 'react';

import { withHOCConstructor } from '../../../lib/compose';
import { mergeRefsAsCallback } from '../../../lib/mergeRefs';
import { runByReadyState } from '../../../lib/runByReadyState';

import { cnTabsMenu, ITabsMenuProps } from '../TabsMenu';
import './TabsMenu_view_motion.css';

export interface IModTabsMenuViewMotion {
	view?: 'motion';
}

/**
 * Modifier responsible for apperance of tabs
 */
export const withModTabsMenuViewMotion = withHOCConstructor<
	IModTabsMenuViewMotion,
	ITabsMenuProps
>(
	{ matchProps: { view: 'motion' }, privateProps: ['view'] },
	(WrappedComponent) => ({
		view,
		activeTab,
		activeTabRef: activeTabRefExternal,
		addonAfter,
		orientation,
		className,
		...props
	}) => {
		const [cursor, setCursor] = useState({
			size: 0,
			offset: 0,
		});

		const activeTabRef = useRef<HTMLLIElement>(null);

		const activeTabRefCb = useMemo(
			() => mergeRefsAsCallback(activeTabRefExternal, activeTabRef),
			[activeTabRefExternal],
		);

		useEffect(() => {
			runByReadyState(() => {
				if (activeTabRef.current === null) return;

				if (orientation === 'horizontal') {
					setCursor({
						size: activeTabRef.current.offsetWidth,
						offset: activeTabRef.current.offsetLeft,
					});
				} else {
					setCursor({
						size: activeTabRef.current.offsetHeight,
						offset: activeTabRef.current.offsetTop,
					});
				}
			}, 'complete');
		}, [activeTab, orientation]);

		const cursorPosition =
			orientation === 'horizontal'
				? {
					width: cursor.size + 'px',
					transform: `translateX(${cursor.offset}px)`,
				  }
				: {
					height: cursor.size + 'px',
					transform: `translateY(${cursor.offset}px)`,
				  };

		return (
			<WrappedComponent
				{...props}
				className={cnTabsMenu({ view }, [className])}
				activeTab={activeTab}
				orientation={orientation}
				activeTabRef={activeTabRefCb}
				addonAfter={
					<>
						<div
							className={cnTabsMenu('Cursor')}
							style={cursorPosition}
						/>
						{addonAfter}
					</>
				}
			/>
		);
	},
);
