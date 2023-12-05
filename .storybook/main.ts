import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
	stories: ['./**/*.mdx', './**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	async webpackFinal(config, { configType }) {
		if (configType === 'DEVELOPMENT') {
			// Modify config for development
		}
		if (configType === 'PRODUCTION') {
			// Modify config for production
		}

		config.resolve = {
			...config.resolve,
			alias: {
				...config.resolve?.alias,
				'@package': path.resolve(__dirname, '../src'),
			},
		};

		// Hack from https://github.com/storybookjs/storybook/issues/18557#issuecomment-1357689644
		// Default config of storybook are not support import of SVG files,
		// and generates error "String contains an invalid character"
		// @ts-ignore
		config.module.rules
			.filter((rule: any) => rule && rule.test && rule.test.test('.svg'))
			.forEach((rule: any) => (rule.exclude = /\.svg$/i));

		const rules = config.module?.rules;
		config.module = {
			...config.module,
			rules: [
				{
					test: /\.svg$/,
					use: {
						// TODO: this library have very bad docs and support and should be replace to something other
						loader: '@svgr/webpack',
						options: {
							svgoConfig: {
								plugins: [
									{
										name: 'preset-default',
										params: {
											overrides: {
												// disable a default plugin
												removeViewBox: false,

												// customize the params of a default plugin
												inlineStyles: {
													onlyMatchedOnce: false,
												},
											},
										},
									},
								],
							},
							// It not work
							attributes: ['width', 'height'],
						},
					},
				},
				...(Array.isArray(rules) ? rules : []),
			],
		};
		return config;
	},
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {
			builder: {
				useSWC: true,
			},
		},
	},
	docs: {
		autodocs: 'tag',
	},
};
export default config;
