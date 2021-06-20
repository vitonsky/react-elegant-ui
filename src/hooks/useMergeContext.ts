import { useContext, useMemo, Context } from 'react';

import { deepMerge } from '../lib/deepMerge';

// TODO: support merge of many than 2 objects
/**
 * Hook to extend context value
 *
 * It get value from context and merge with addon data
 */
export const useMergeContext = <T extends Context<{}>>(
	context: T,
	addonData: T extends Context<infer X> ? X : never,
) => {
	const ctx = useContext(context);
	const result = useMemo(() => deepMerge(ctx, addonData), [ctx, addonData]);
	return result;
};
