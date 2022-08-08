const gulp = require('gulp');
const ts = require('gulp-typescript');
const mergeStream = require('merge-stream');
const babel = require('gulp-babel');
const { extendDefaultPlugins } = require('svgo');

const cleanPackage = require('gulp-clean-package');

const buildDir = 'dist';

// Helpers
function tsCompilerFactory(outPath, settings) {
	return function compileTS() {
		const tsProject = ts.createProject('tsconfig.json', settings);

		return gulp
			.src(['src/**/*.{ts,tsx}'])
			.pipe(tsProject())
			.pipe(gulp.dest(outPath));
	};
}

function copyAssetsFactory(outPath) {
	return function copyAssets() {
		const resources = 'src/**/*.{css,svg,yml}';
		const docs = 'src/**/*.md';

		return gulp.src([resources, docs]).pipe(gulp.dest(outPath));
	};
}

// Main
function buildESM() {
	const out = `${buildDir}/esm`;

	return gulp.parallel([
		Object.assign(tsCompilerFactory(out, { module: 'esnext' }), {
			displayName: 'TSC:esnext',
		}),
		Object.assign(copyAssetsFactory(out), {
			displayName: 'CopyAssets:esnext',
		}),
	]);
}

// Pipeline
function transformSVGInESM() {
	const out = `${buildDir}/esm`;

	return mergeStream(
		gulp.src([`${out}/**/*.js`]).pipe(
			babel({
				presets: ['@babel/preset-react'],
				plugins: [
					[
						'inline-react-svg',
						{
							svgo: {
								plugins: extendDefaultPlugins([
									{
										name: 'removeViewBox',
										active: false,
									},
								]),
							},
						},
					],
				],
			}),
		),
		gulp.src([`${buildDir}/esm/**/*.ts`]),
	).pipe(gulp.dest(out));
}

function makeCJSFromESM() {
	const esm = `${buildDir}/esm`;
	const out = buildDir;

	const copyAssets = copyAssetsFactory(out);

	return mergeStream(
		// Copy type declarations
		gulp.src([`${esm}/**/*.ts`]),
		// Convert to CJS
		gulp.src([`${esm}/**/*.js`]).pipe(
			babel({
				presets: ['@babel/preset-react'],
				plugins: ['@babel/plugin-transform-modules-commonjs'],
			}),
		),
		copyAssets(),
	).pipe(gulp.dest(out));
}

function copyMetaFiles() {
	return mergeStream(
		// Clean package.json
		gulp.src(['./package.json']).pipe(cleanPackage()),
		// Copy other
		gulp.src(['./README.md', './src/custom.d.ts']),
	).pipe(gulp.dest(buildDir));
}

// Compilations
const fullBuild = gulp.series([
	copyMetaFiles,
	buildESM(),
	transformSVGInESM,
	makeCJSFromESM,
]);

module.exports.default = fullBuild;
