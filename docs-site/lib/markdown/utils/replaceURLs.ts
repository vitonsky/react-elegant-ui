import remark from 'remark';
import toMarkdown from 'mdast-util-to-markdown';

import { walker, walkerAsync, WalkerCodes } from '../lib/walker';

export const replaceURLs = (
	raw: string,
	handler: (url: string, type: 'image' | 'link') => string,
) => {
	const tree = remark().parse(raw);

	// Walk all URLs
	walker(tree, (node: any): any => {
		if (node.type === 'link' || node.type === 'image') {
			// Handle URL
			if ('url' in node && typeof node.url === 'string') {
				node.url = handler(node.url, node.type);
				return [WalkerCodes.CONTINUE, node];
			}
		}
	});

	return toMarkdown(tree);
};

export const replaceURLsAsync = async (
	raw: string,
	handler: (url: string, type: 'image' | 'link') => Promise<string>,
) => {
	const tree = remark().parse(raw);

	// Walk all URLs
	await walkerAsync(tree, async (node: any): Promise<any> => {
		if (node.type === 'link' || node.type === 'image') {
			// Handle URL
			if (typeof node.url === 'string') {
				node.url = await handler(node.url, node.type);
				return [WalkerCodes.CONTINUE, node];
			}
		}
	});

	return toMarkdown(tree);
};
