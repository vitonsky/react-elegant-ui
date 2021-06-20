import { MergeHandler } from '../core';

/**
 * Just redefine value
 */
export const Redefine: MergeHandler = ({ value, setValue }) => setValue(value);
