import cfg from './config';
import { indexPage, routes } from './routes';

import { NavEntry } from './components/Navigation/Navigation';
import {
	pageItem,
	pageItemResult,
	getPagesPaths,
	pagePathsOptions,
} from './lib/pages/getPagesPaths';
import { normalizePath } from './lib/utils';

export const routesToPagesPathsList = (routes: NavEntry[]) =>
	routes.reduce((acc, route) => {
		if ('child' in route) {
			acc.push(...routesToPagesPathsList(route.child));
		} else {
			const url = normalizePath(route.path.slice(1));
			acc.push({ url, filename: url + '.md' });
		}

		return acc;
	}, [] as pageItem[]);

export const pagesPaths = routesToPagesPathsList(routes).concat(
	// Add root page
	{
		url: 'index',
		filename: indexPage,
	},
	// Add docs root
	{
		url: 'docs',
		filename: indexPage,
	},
);

// Cache to prevent parsing twice
let pagesCache: pageItemResult[] | null = null;

export const getAllPagesPaths = async (opts?: Partial<pagePathsOptions>) => {
	if (pagesCache === null) {
		pagesCache = await getPagesPaths(pagesPaths, {
			root: cfg.root,
			includeRefs: true,
			...opts,
		});
	}

	return pagesCache;
};
