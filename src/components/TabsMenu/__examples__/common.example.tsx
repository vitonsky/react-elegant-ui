import React, { FC, useState } from 'react';
import { Icon } from '../../Icon/Icon.bundle/desktop';
import { TabsMenu } from '../TabsMenu.bundle/desktop';

const tabs = [
	{
		id: 'search',
		content: 'Search',
	},
	{
		id: 'images',
		content: 'Images',
	},
	{
		id: 'news',
		content: 'News',
		disabled: true,
	},
	{
		id: 'video',
		content: 'Video',
	},
	{
		id: 'icon',
		content: (
			<span>
				<Icon glyph="expand-more" /> Icon <Icon glyph="expand-more" />
			</span>
		),
	},
];

export const Base: FC<{ view: 'default' | 'primitive' | 'motion' }> = ({
	view,
}) => {
	const [activeTab, setActiveTab] = useState('search');

	return (
		<>
			<table>
				<tbody>
					<tr>
						<td>
							<TabsMenu
								view={view}
								layout="horizontal"
								size="m"
								tabs={tabs}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
								loopSwitching
							/>
						</td>
					</tr>
					<tr>
						<td>
							<TabsMenu
								view={view}
								layout="horizontal"
								size="s"
								tabs={tabs}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
							/>
						</td>
					</tr>
				</tbody>
			</table>

			<table>
				<tbody>
					<tr>
						<td>
							<TabsMenu
								view={view}
								layout="vertical"
								size="m"
								tabs={tabs}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
								loopSwitching
							/>
						</td>
						<td>
							<TabsMenu
								view={view}
								layout="vertical"
								size="s"
								tabs={tabs}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export const ViewDefault = () => <Base view="default" />;
export const ViewPrimitive = () => <Base view="primitive" />;
export const ViewMotion = () => <Base view="motion" />;
