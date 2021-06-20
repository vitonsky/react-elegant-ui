const path = require('path');

const outDir = 'dist';
const outputPath = path.join(__dirname, outDir);

const mode =
	process.env.NODE_ENV === 'production' ? 'production' : 'development';
const devtool = mode === 'production' ? undefined : 'inline-source-map';
const isFastBuild =
	process.env.NODE_ENV !== 'production' && process.env.FAST_BUILD === 'on';

module.exports = {
	mode,
	devtool,
	entry: {
		index: './src/index.tsx',
	},
	output: {
		filename: '[name].js',
		path: outputPath,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
					options: {
						projectReferences: true,
						transpileOnly: isFastBuild,
					},
				},
			},
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				use: [
					{
						// TODO: this library have very bad docs and support and should be replace to something other
						loader: '@svgr/webpack',
						options: {
							svgoConfig: {
								plugins: {
									// Option to prevent removing viewBox to svg can be resize
									// Issue created in 2017 https://github.com/gregberge/svgr/issues/18
									removeViewBox: false,
								},
							},
							// It not work
							attributes: ['width', 'height'],
						},
					},
				],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
						options: {
							injectType: 'linkTag',
						},
					},
					{
						loader: 'file-loader',
						options: {
							esModule: false,
							outputPath: 'styles',
							name: '[name].[hash:8].[ext]',
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	cache: {
		type: 'filesystem',
		cacheDirectory: path.resolve(__dirname, '.cache/webpack'),
	},
};
