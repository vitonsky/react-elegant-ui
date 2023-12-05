import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@package/components/Button/Button.bundle/desktop';
import { theme } from '@package/theme/presets/default';
import { cnTheme } from '@package/theme';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: 'Examples/Button',
	component: Button,
	decorators: (Component) => (
		<div className={cnTheme(theme)}>
			<Component />
		</div>
	),
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: 'centered',
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ['autodocs'],
	args: {
		children: 'Button',
		view: 'default',
		size: 'm',
	},
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		view: {
			control: 'select',
			options: ['default', 'action', 'pseudo', 'clear', 'link'],
		},
		size: {
			control: 'select',
			options: ['l', 'm', 's'],
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Sample: Story = {};
