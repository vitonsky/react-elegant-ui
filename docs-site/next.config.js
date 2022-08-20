// Use `basePath` for github pages
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/react-elegant-ui' : '';
const { withGlobalCss } = require('next-global-css');

const withConfig = withGlobalCss();

module.exports = withConfig({
	poweredByHeader: false,
	trailingSlash: true,
	future: {
		webpack5: true,
	},
	basePath,
	publicRuntimeConfig: {
		title: 'Elegant UI',
		repo: 'https://github.com/vitonsky/react-elegant-ui',
		staticFolder: '/static',
		basePath,
	},
});
