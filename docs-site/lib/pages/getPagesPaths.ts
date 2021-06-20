import path from 'path';
import { promises } from 'fs';

import { isLocalPath, normalizePath } from '../utils';
import { getMarkdownPageData } from '../pages/getMarkdownPageData';
import { replaceURLs } from '../markdown/utils/replaceURLs';

const { readFile } = promises;

export type pageItem = { filename: string; url: string };
export type pageItemResult = {
	slug: string[];
	url: string;
	path: string;
	absolutePath: string;
};
export type pagePathsOptions = {
	/**
	 * Root directory for relative links
	 */
	root: string;

	/**
	 * Find links to other pages and include to result
	 */
	includeRefs?: boolean;

	/**
	 * When disabled, only one copy of page will created and other urls which use page will skip
	 */
	allowAliases?: boolean;
};

/**
 * Return all paths data for each page
 */
export const getPagesPaths = async (
	pages: pageItem[],
	{ root, includeRefs = false, allowAliases = true }: pagePathsOptions,
) => {
	const pagesList: pageItemResult[] = [];
	const exploredPages = new Set<string>();

	const collectPageData = async (pageItem: pageItem) => {
		const filename = decodeURI(pageItem.filename);
		const absolutePath = path.resolve(root, filename);

		// Optionally skip aliases
		if (includeRefs && !allowAliases && exploredPages.has(absolutePath))
			return;

		// Add page data
		pagesList.push({
			slug: pageItem.url.split('/'),
			url: '/' + pageItem.url,
			path: filename,
			absolutePath,
		});

		// Recursive search of inner links
		if (includeRefs && !exploredPages.has(absolutePath)) {
			// Mark as explored
			exploredPages.add(absolutePath);

			const rawPage = await readFile(absolutePath);
			const pageText = rawPage.toLocaleString();
			const page = getMarkdownPageData(pageText);

			const pageDir = path.dirname(absolutePath);

			// Collect relative links
			const localPages: pageItem[] = [];
			replaceURLs(page.text, (url, type) => {
				if (
					type === 'link' &&
					isLocalPath(url) &&
					path.extname(url) === '.md'
				) {
					const fullPath = path.resolve(pageDir, url);

					const pagePath = normalizePath(fullPath)
						// Remove root dir and trailing slash from path
						.slice(root.length + 1)
						.replace(/\.md$/, '');

					localPages.push({
						url: pagePath,
						filename: pagePath + '.md',
					});
				}

				return url;
			});

			// Handle inner links to other pages
			for (const pagePath of localPages) {
				await collectPageData(pagePath);
			}
		}
	};

	// Handle links
	for (const page of pages) {
		await collectPageData(page);
	}

	return pagesList;
};
