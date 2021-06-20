import { ExtractProps } from '../lib/compose';

import { OptionalKeys } from './utility-types';

/**
 * Extract props from components in registry
 */
export type ExtractPropsFromRegistry<T> = {
	[K in keyof T]?: ExtractProps<T[K]>;
};

/**
 * Convert registry object type to context object type
 */
export type ConvertRegistryObjectToContext<T> = {
	[K in keyof T]?: OptionalKeys<ExtractProps<T[K]>>;
};
