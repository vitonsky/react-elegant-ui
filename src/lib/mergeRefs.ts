import { MutableRefObject, Ref } from 'react';

import { Maybe } from '../types/utility-types';

/**
 * Make ref callback which handle all refs in defined order
 */
export function mergeRefsAsCallback<TElement extends HTMLElement>(
	...refs: Maybe<Ref<TElement>>[]
) {
	return (node: TElement | null) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(node);
			} else if (ref !== null && ref !== undefined) {
				(ref as MutableRefObject<TElement | null>).current = node;
			}
		});
	};
}
