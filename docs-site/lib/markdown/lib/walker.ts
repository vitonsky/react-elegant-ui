import { Node, Parent, Literal } from 'unist';

export type AnyUnistNode = Node | Parent | Literal;

export const WalkerCodes = {
	CONTINUE: 0,
	STOP: 1,
};

// Simply implementation of https://github.com/syntax-tree/unist-util-visit-parents/blob/main/index.js
type WalkerHandlerFn = (node: AnyUnistNode) => void | WalkerHandlerResult;
type WalkerHandlerFnPromise = (
	node: AnyUnistNode,
) => Promise<void | WalkerHandlerResult>;
type WalkerHandlerResult = [number, Node | null];

export function* walkGenerator(
	tree: AnyUnistNode,
): Generator<Node, WalkerHandlerResult, void | WalkerHandlerResult> {
	// export const walkerHelper = (tree: Node, handler: WalkerHandler) => {
	let localSignal = 0;
	const localTree = { ...tree };

	if ('children' in localTree) {
		const childs = localTree.children as Node[];
		const localChilds: Node[] = [];

		// Collect local childs tree
		for (let idx = 0; idx < childs.length; idx++) {
			const node = childs[idx];

			// Call handler
			let result = yield node;

			if (result === undefined) {
				// Call walker when handler do nothing
				result = yield* walkGenerator(node);

				// If walker do nothing, skip node
				// NOTE: at this time walker cant return `undefined` and this check will always false
				if (result === undefined) {
					continue;
				}
			}

			const [signal, newNode] = result;

			// Set node if not empty
			if (newNode !== null) {
				localChilds[idx] = newNode;
			}

			// Stop walking
			if (signal === WalkerCodes.STOP) {
				localSignal = signal;
				break;
			}
		}

		// Write local childs tree
		localTree.children = localChilds;
	}

	return [localSignal, localTree] as WalkerHandlerResult;
}

export function walker(tree: AnyUnistNode, handler: WalkerHandlerFn): Node {
	if ('children' in tree) {
		const gen = walkGenerator(tree);
		let iter = gen.next();

		while (!iter.done) {
			const handlerResult = handler(iter.value);
			iter = gen.next(handlerResult);
		}

		return iter.value[1] as Node;
	}

	return tree;
}

export async function walkerAsync(
	tree: AnyUnistNode,
	handler: WalkerHandlerFnPromise,
): Promise<Node> {
	if ('children' in tree) {
		const gen = walkGenerator(tree);
		let iter = gen.next();

		while (!iter.done) {
			const handlerResult = await handler(iter.value);
			iter = gen.next(handlerResult);
		}

		return iter.value[1] as Node;
	}

	return tree;
}
