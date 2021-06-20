import { Ref, useMemo } from 'react';

import { Maybe } from '../types/utility-types';
import { mergeRefsAsCallback } from '../lib/mergeRefs';

/**
 * Merge refs and return a memoized `RefCallback`
 */
export const useRefMix = <TElement extends HTMLElement>(
	...refs: Maybe<Ref<TElement>>[]
) => {
	// use spread
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => mergeRefsAsCallback(...refs), refs);
};
