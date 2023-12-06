import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const PROJECT_NAME = 'Elegant UI';

const config: Config = {
	title: PROJECT_NAME,
	tagline: 'Elegant UI components, made by BEM best practices for react',

	// Set the production url of your site here
	url: 'https://vitonsky.github.io',
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: '/react-elegant-ui/',

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	// organizationName: 'facebook', // Usually your GitHub org/user name.
	// projectName: 'docusaurus', // Usually your repo name.

	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	plugins: [require.resolve('docusaurus-lunr-search')],
	presets: [
		[
			'classic',
			{
				docs: {
					path: './docs',
					include: ['**/*.md'],
					exclude: ['README.md'],
					routeBasePath: '/', // Serve the docs at the site's root
					sidebarPath: './sidebars.ts',
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl:
						'https://github.com/vitonsky/react-elegant-ui/tree/master/docs/',
				},
				blog: false,
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		// Replace with your project's social card
		// image: 'img/docusaurus-social-card.jpg',
		navbar: {
			title: PROJECT_NAME,
			items: [
				// TODO: implement playground
				// {
				// 	href: '/',
				// 	label: 'Playground',
				// 	position: 'left',
				// },
				{
					href: 'https://www.npmjs.com/package/react-elegant-ui',
					label: 'NPM',
					position: 'right',
				},
				{
					href: 'https://github.com/vitonsky/react-elegant-ui',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		// footer: {
		// 	style: 'light',
		// 	// links: [
		// 	// 	{
		// 	// 		title: 'Docs',
		// 	// 		items: [
		// 	// 			{
		// 	// 				label: 'Tutorial',
		// 	// 				to: '/docs/intro',
		// 	// 			},
		// 	// 		],
		// 	// 	},
		// 	// ],
		// },
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
