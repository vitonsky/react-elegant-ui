const cyan = '\x1b[36m';
const r = '\x1b[0m';

// Thank for this hack to https://github.com/yarastqt/next-global-css
// It allow to use a global CSS

// TODO: refactor this. It's just PoC
function patchServerStyles(config) {
	const originalEntry = config.entry;
	config.entry = async () => {
		const entry = await originalEntry();
		// Prepend module with patched `require` for ignore load css files.
		const patch = require.resolve('./scripts/patch-global-require');
		if (entry['pages/_app'].indexOf(patch) === -1) {
			entry['pages/_app'].unshift(patch);
		}
		console.log(
			`${cyan}info${r}  - Enabled global css for node_modules (server).`,
		);
		return entry;
	};
}

function patchClientStyles(config) {
	config.module.rules.forEach((rule) => {
		const rules = rule.oneOf;
		if (!rules) return;

		for (const rule of rules) {
			if (rule.test && rule.issuer) {
				if (Array.isArray(rule.issuer.not)) {
					for (const idx in rule.issuer.not) {
						if (rule.issuer.not[idx].source === 'node_modules') {
							// Remove `node_modules` from issuer for allow import css from 3d-party libs.
							rule.issuer.not.splice(idx, 1);
							console.log(
								`${cyan}info${r}  - Enabled global css for node_modules (client).`,
							);
						}
					}
				}
			}
		}
	});
}

// Use `basePath` for github pages
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/react-elegant-ui' : '';

module.exports = {
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

	webpack: (config, options) => {
		const { isServer, webpack } = options;

		if (isServer) {
			patchServerStyles(config);
		} else {
			patchClientStyles(config);
		}

		return config;
	},
};
