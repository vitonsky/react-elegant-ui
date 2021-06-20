import React, { useState, version } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '@bem-react/classname';

import './index.css';
import { ComponentsListing } from './ComponentsListing';
import { Select } from '../../../src/components/Select/Select.bundle/desktop';

// Theme
import {
	cnTheme,
	configureRootTheme,
	ThemeWhitepaper,
} from '../../../src/theme';
import { theme as themeDefault } from '../../../src/theme/presets/default';
import { theme as themeWine } from '../../../src/theme/presets/wine';
import { theme as themeDark } from '../../../src/theme/presets/dark';

const cnDemoPage = cn('DemoPage');

const themesList: Record<string, ThemeWhitepaper> = {
	default: themeDefault,
	dark: themeDark,
	wine: themeWine,
};

function DemoPage() {
	const clientTheme = localStorage.getItem('theme');
	const defaultTheme =
		clientTheme !== null && clientTheme in themesList
			? clientTheme
			: 'default';

	const [theme, setTheme] = useState<string>(defaultTheme);

	if (clientTheme !== theme) {
		localStorage.setItem('theme', theme);
	}

	const saveTheme = (theme: string) => {
		localStorage.setItem('theme', theme);
		setTheme(theme);
	};

	return (
		<div className={cnDemoPage()}>
			<div className={cnDemoPage('Header')}>
				<span>Theme: </span>
				<Select
					options={Object.keys(themesList).map((key) => ({
						id: key,
						content: key,
					}))}
					value={theme}
					setValue={(newValue) => {
						if (
							newValue !== undefined &&
							!Array.isArray(newValue) &&
							newValue in themesList
						) {
							saveTheme(newValue);
						}
					}}
				/>

				<span style={{ float: 'right' }}>React version: {version}</span>
			</div>
			<div className={cnDemoPage('Main', [cnTheme(themesList[theme])])}>
				<ComponentsListing />
			</div>
		</div>
	);
}

configureRootTheme({ theme: themeDefault });
ReactDOM.render(<DemoPage />, document.getElementById('root'));
