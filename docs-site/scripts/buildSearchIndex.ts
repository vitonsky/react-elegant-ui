import lunr from 'lunr';
import path from 'path';

import { getPageData } from '../lib/pages/getPageData';
import { getAllPagesPaths } from '../pages';
import { writeFileForce } from '../lib/utils';
import { staticDir } from '../lib/files';

const ignoreURLs = ['/index'];

const dataDir = staticDir + '/searchData';
const pagesDir = dataDir + '/pagesText';

const publicDir = path.resolve(__dirname, '../public');
const root = path.resolve(__dirname, '../..');

(async () => {
	const pagesPaths = (await getAllPagesPaths({ allowAliases: false })).filter(
		({ url }) => ignoreURLs.indexOf(url) === -1,
	);

	// Get pages data
	const pagesData = await Promise.all(
		pagesPaths.map(async ({ absolutePath: pagePath, url }) => {
			const filenameWithPath = url + '.json';
			const { title, textForSearch: text } = await getPageData(pagePath, {
				root,
			});

			// Collect data
			const pageData = { url, title, text };

			// Save page data to file to show while search
			const serializedPage = JSON.stringify(pageData, null, 2);
			const filePath = path.join(publicDir, pagesDir, filenameWithPath);
			await writeFileForce(filePath, serializedPage);

			// Add ref as link to serialized file
			const ref = '/' + pagesDir + filenameWithPath;
			return { ...pageData, ref };
		}),
	);

	// Make index
	const idx = lunr(function() {
		this.ref('ref');
		this.field('title');
		this.field('text');
		this.metadataWhitelist = ['position'];

		pagesData.forEach((doc) => {
			this.add(doc);
		}, this);
	});

	// Write index
	// TODO: disable prettifying and pack to `.gz` to decrease size
	const serializedData = JSON.stringify(idx, null, 2);
	await writeFileForce(
		path.join(publicDir, dataDir, 'index.json'),
		serializedData,
	);
})();
