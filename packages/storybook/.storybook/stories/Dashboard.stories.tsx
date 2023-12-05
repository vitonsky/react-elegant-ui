import type { Meta, StoryObj } from '@storybook/react';

import { theme as themeLight } from '@package/theme/presets/default';
import { theme as themeDark } from '@package/theme/presets/dark';
import { theme as themeWine } from '@package/theme/presets/wine';
import { cnTheme } from '@package/theme';
import React from 'react';
import { Button } from '@package/components/Button/Button.bundle/desktop';
import { MenuWithState, demoList } from './Menu.stories';

import { Checkbox } from '@package/components/Checkbox/Checkbox.bundle/desktop';
import { Textinput } from '@package/components/Textinput/Textinput.bundle/desktop';
import { Textarea } from '@package/components/Textarea/Textarea.bundle/desktop';
import { Select } from '@package/components/Select/Select.bundle/desktop';
import { TabsMenu } from '@package/components/TabsMenu/TabsMenu.bundle/desktop';

const demoTabs = [
	{ id: 'foo', content: 'Foo' },
	{ id: 'bar', content: 'Bar' },
	{ id: 'baz', content: 'Baz' },
];

const themes = {
	light: themeLight,
	dark: themeDark,
	wine: themeWine,
};

type DashboardProps = {
	theme: keyof typeof themes;
};

const Dashboard = ({ theme }: DashboardProps) => {
	return (
		<div
			className={cnTheme(themes[theme])}
			style={{
				display: 'flex',
				flexDirection: 'row',
				gap: '1rem',
				width: 'auto',
				backgroundColor: 'var(--color-fill-color-default)',
				padding: 'var(--typography-controls-indent-l)',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '.5rem',
						width: 'auto',
					}}
				>
					{['s', 'm', 'l'].map((size) => (
						<div
							key={size}
							style={{
								display: 'flex',
								flexDirection: 'row',
								gap: '.5rem',
								width: 'auto',
								alignItems: 'start',
							}}
						>
							<Button size={size as any} view="default">
								Button
							</Button>
							<Button size={size as any} view="action">
								Action
							</Button>
							<Button size={size as any} view="pseudo">
								Pseudo
							</Button>
							<Button size={size as any} view="clear">
								Clear
							</Button>
							<Button size={size as any} view="link">
								Link
							</Button>
						</div>
					))}
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						gap: '1rem',
						width: 'auto',
					}}
				>
					<Select options={demoList} value={'apple'} />
					<Select options={demoList} value={['apple', 'banana']} />
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						gap: '1rem',
						width: 'auto',
					}}
				>
					{['s', 'm', 'l'].map((size) => (
						<Checkbox key={size} label={`Size ${size}`} />
					))}
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						gap: '1rem',
						width: 'auto',
					}}
				>
					{['s', 'm'].map((size) => (
						<div
							key={size}
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem',
								width: 'auto',
							}}
						>
							<Textinput
								value={`Textinput ${size}`}
								hasClear
								hint="Hint text"
							/>
							<Textinput
								value={`Textinput ${size}`}
								hasClear
								hint="Hint text"
								disabled
							/>
							<Textinput
								value={`Textinput ${size}`}
								hasClear
								hint="Hint text"
								state="error"
							/>
						</div>
					))}
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						gap: '1rem',
						width: 'auto',
					}}
				>
					{['s', 'm'].map((size) => (
						<div
							key={size}
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: '1rem',
								width: 'auto',
							}}
						>
							<Textarea
								value={`Textarea ${size}`}
								hasClear
								hint="Hint text"
							/>
							<Textarea
								value={`Textarea ${size}`}
								hasClear
								hint="Hint text"
								disabled
							/>
							<Textarea
								value={`Textarea ${size}`}
								hasClear
								hint="Hint text"
								state="error"
							/>
						</div>
					))}
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						gap: '.5rem',
						width: 'auto',
					}}
				>
					<MenuWithState items={demoList} />
					<MenuWithState
						items={demoList}
						type="radio"
						value={'banana'}
					/>
					<MenuWithState
						items={demoList}
						type="checkbox"
						value={['apple', 'banana']}
					/>
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						gap: '.5rem',
						width: 'auto',
						alignItems: 'start',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '.5rem',
							width: 'auto',
						}}
					>
						<TabsMenu
							tabs={demoTabs}
							view="primitive"
							activeTab="foo"
							layout="horizontal"
						/>
						<TabsMenu
							tabs={demoTabs}
							view="motion"
							activeTab="foo"
							layout="horizontal"
						/>
					</div>
					<TabsMenu
						tabs={demoTabs}
						view="primitive"
						activeTab="foo"
						layout="vertical"
					/>
					<TabsMenu
						tabs={demoTabs}
						view="motion"
						activeTab="foo"
						layout="vertical"
					/>
				</div>
			</div>
		</div>
	);
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Overview/Dashboard',
	component: Dashboard,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	args: {
		theme: 'dark',
	},
	argTypes: {
		theme: {
			control: 'select',
			options: ['light', 'dark', 'wine'],
		},
	},
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Sample: Story = {};
