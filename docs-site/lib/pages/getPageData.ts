import path from 'path';
import crypto from 'crypto';
import { promises } from 'fs';

import {
	isLocalPath,
	isSubstring,
	normalizePath,
	writeFileForce,
} from '../utils';
import { getMarkdownPageData } from '../pages/getMarkdownPageData';
import { replaceURLsAsync } from '../markdown/utils/replaceURLs';
import { filesDirAbs, filesDirRel } from '../files';

const { readFile, stat } = promises;

/**
 * Return page data with correction inner links
 */
export const getPageData = async (
	filePath: string,
	{
		root,
		filenameStrategy = 'original',
	}: { root: string; filenameStrategy?: 'hash' | 'original' },
) => {
	const fileText = (await readFile(filePath)).toLocaleString();
	const parsedMd = getMarkdownPageData(fileText);

	const text = await replaceURLsAsync(parsedMd.text, async (url, type) => {
		// Skip not local URLs
		if (!isLocalPath(url)) return url;

		const fullPath = path.resolve(path.dirname(filePath), url);

		// Check chroot
		if (!isSubstring(root, fullPath)) {
			throw Error('Out of docs directory ' + fullPath);
		}

		// Fix local links to `.md` files
		if (type === 'link' && path.extname(url) === '.md') {
			const relativePath = normalizePath(fullPath)
				.slice(root.length)
				.replace(/\.md$/, '');

			return relativePath;
		}

		// Copy local files to public dir and replace links on it in page
		let filename = '';
		if (filenameStrategy === 'original') {
			// Keep original name
			filename = normalizePath(fullPath).slice(root.length + 1);
		} else {
			// Use hash as name to determine it for all pages
			const hash = crypto
				.createHash('sha256')
				.update(fullPath)
				.digest('hex');
			const ext = path.extname(fullPath);
			filename = hash + ext;
		}

		const content = await readFile(fullPath);
		await writeFileForce(path.join(filesDirAbs, filename), content);

		const publicPath = '/' + filesDirRel + '/' + filename;
		return publicPath;
	});

	const title = parsedMd.meta?.title;

	const pageData = {
		title: typeof title === 'string' ? title : parsedMd.title,
		meta: parsedMd.meta,
		text,

		// TODO: remove it
		date: (await stat(filePath)).mtime.getTime(),

		// TODO: move it to index builder
		textForSearch: parsedMd.textForSearch,
	};

	return pageData;
};
