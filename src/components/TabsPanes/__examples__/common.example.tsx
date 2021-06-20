import React, { FC, useState } from 'react';
import { Button } from '../../Button/Button.bundle/desktop';

import { TabsMenu } from '../../TabsMenu/TabsMenu.bundle/desktop';
import { TabsPanes } from '../TabsPanes.bundle/desktop';

/**
 * Demo component with inner state
 */
const Counter: FC = () => {
	const [counter, setCounter] = useState(0);
	return (
		<Button onPress={() => setCounter((num) => num + 1)}>
			Cick me: {counter}
		</Button>
	);
};

export const WithTabsMenu = () => {
	const [activeTab, setActiveTab] = useState('counter');

	return (
		<>
			<TabsMenu
				view="default"
				layout="horizontal"
				size="m"
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				tabs={[
					{
						id: 'counter',
						content: 'Click counter',
					},
					{
						id: 'search',
						content: 'Search',
					},
					{
						id: 'images',
						content: 'Images',
					},
					{
						id: 'video',
						content: 'Video',
					},
				]}
			/>
			<TabsPanes
				activePane={activeTab}
				style={{ padding: 'var(--typography-controls-indent-l) 0px' }}
				panes={[
					{
						id: 'counter',
						content: (
							<>
								<Counter /> i will rerender with switch tab
							</>
						),
					},
					{ id: 'search', content: 'Search content' },
					{ id: 'images', content: 'Images content' },
					{ id: 'video', content: 'Video content' },
				]}
			/>
		</>
	);
};

export const WithRenderAll = () => {
	const [activeTab, setActiveTab] = useState('counter');

	return (
		<>
			<TabsMenu
				view="default"
				layout="horizontal"
				size="m"
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				tabs={[
					{
						id: 'counter',
						content: 'Click counter',
					},
					{
						id: 'search',
						content: 'Search',
					},
					{
						id: 'images',
						content: 'Images',
					},
					{
						id: 'video',
						content: 'Video',
					},
				]}
			/>
			<TabsPanes
				renderAll
				activePane={activeTab}
				style={{ padding: 'var(--typography-controls-indent-l) 0px' }}
				panes={[
					{
						id: 'counter',
						content: (
							<>
								<Counter /> i will keep value
							</>
						),
					},
					{ id: 'search', content: 'Search content' },
					{ id: 'images', content: 'Images content' },
					{ id: 'video', content: 'Video content' },
				]}
			/>
		</>
	);
};
