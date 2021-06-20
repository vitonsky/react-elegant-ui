import { NavEntry } from './components/Navigation/Navigation';

export const indexPage = 'README.md';

export const routes: NavEntry[] = [
	{
		title: 'Introduction',
		child: [
			{
				// type: 'md',
				title: 'About',
				path: '/docs/Introduction/About',
			},
			{
				// type: 'md',
				title: 'Getting started',
				path: '/docs/Introduction/GettingStarted',
			},
			{
				// type: 'md',
				title: 'Package structure',
				path: '/docs/Introduction/PackageStructure',
			},
			{
				// type: 'md',
				title: 'Component architecture',
				path: '/docs/Introduction/ComponentArchitecture',
			},
			{
				// type: 'md',
				title: 'Component file structure',
				path: '/docs/Introduction/ComponentFileStructure',
			},
			{
				// type: 'md',
				title: 'Theming',
				path: '/docs/Introduction/Theming',
			},
			{
				// type: 'md',
				title: 'Tokens',
				path: '/docs/Introduction/Tokens',
			},
		],
	},

	{
		title: 'Component development',
		child: [
			{
				// type: 'md',
				title: 'Introduction',
				path: '/docs/Component development/Introduction',
			},
			{
				// type: 'md',
				title: 'Component naming',
				path: '/docs/Component development/ComponentNaming',
			},
			{
				// type: 'md',
				title: 'Design system',
				path: '/docs/Component development/DesignSystem',
			},
			{
				// type: 'md',
				title: 'Notes',
				path: '/docs/Component development/Notes',
			},
		],
	},

	{
		title: 'Contributing',
		child: [
			{
				// type: 'md',
				title: 'Contributing rules',
				path: '/docs/Contributing/ContributingRules',
			},
			{
				// type: 'md',
				title: 'CLA',
				path: '/docs/Contributing/CLA',
			},
		],
	},
];
