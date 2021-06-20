import remark from 'remark';
import matter from 'gray-matter';
import { walker, WalkerCodes } from '../markdown/lib/walker';
import { toText } from '../markdown/utils/toText';

export const getMarkdownPageData = (raw: string) => {
	// Get meta data
	const { data: meta, content } = matter(raw);

	const tree = remark().parse(content);

	// Find title
	let title: null | string = null;
	walker(tree, (node): any => {
		if (node.type === 'heading') {
			let status = 0;
			node = walker(node, (node): any => {
				if (node.type !== 'text') return;

				const value = node.value;
				if (typeof value === 'string' && value.length > 0) {
					title = value;
					status = WalkerCodes.STOP;
					return [status, node];
				}
			});
			return [status, node];
		}
	});

	return {
		meta,
		title,
		text: content,
		textForSearch: toText(tree, ['code', 'html', 'inlineCode']),
	};
};
