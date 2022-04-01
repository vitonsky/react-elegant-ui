import {
	CompositeUnitSimple,
	Composition,
	InferStructFromCompositeUnit,
} from './types';
import { composeU } from './composeU';

/**
 * Compose HOCs with discriminated union props
 *
 * Will apply firsh matched HOC
 *
 * All private props for unmatched HOCs will removed
 */
export function composeUD<T extends CompositeUnitSimple<any>[]>(
	...wrappers: T
): T extends Array<infer X>
	? Composition<InferStructFromCompositeUnit<X>>
	: never;
export function composeUD(
	...wrappers: CompositeUnitSimple<any>[]
): Composition<any> {
	return (composeU as any)(...wrappers);
}
