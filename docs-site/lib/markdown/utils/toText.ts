import { Node } from 'unist';
import { walker, WalkerCodes } from '../lib/walker';

export const toText = (tree: Node, ignoredTokens: string[] = []) => {
	let text = '';

	walker(tree, (node): any => {
		// Skip ignored tokens
		if (ignoredTokens.indexOf(node.type) !== -1) {
			return [WalkerCodes.CONTINUE, null];
		}

		if (node.type === 'text') {
			text += node.value;
		} else if (node.type === 'heading') {
			// Remove headers
			text += '\n\n';
			return [WalkerCodes.CONTINUE, null];
		}
	});

	return text;
};
