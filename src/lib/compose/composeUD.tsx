import { CompositeUnitSimple, Composition } from './types';
import { composeU } from './composeU';

// To generate reloads just run this:
// Array(10)
// 	.fill(1)
// 	.map((_, idx) => {
// 		const num = idx + 1;
// 		const nums = Array(num)
// 			.fill(1)
// 			.map((_, id) => id);
// 		const Types = nums.map((id) => 'T' + (id + 1));
// 		const generics = Types.join(', ');
// 		const args = Types.map(
// 			(T, idx) => `fn${idx + 1}: CompositeUnitSimple<${T}>`,
// 		).join(',');
// 		return `export function composeUD<${generics}>(${args}): Composition<${Types.join(
// 			' | ',
// 		)}>;`;
// 	})
// 	.join('\n');

/**
 * Compose HOCs with discriminated union props
 *
 * Will apply firsh matched HOC
 *
 * All private props for unmatched HOCs will removed
 */
export function composeUD<T1>(fn1: CompositeUnitSimple<T1>): Composition<T1>;
export function composeUD<T1, T2>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
): Composition<T1 | T2>;
export function composeUD<T1, T2, T3>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
): Composition<T1 | T2 | T3>;
export function composeUD<T1, T2, T3, T4>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
): Composition<T1 | T2 | T3 | T4>;
export function composeUD<T1, T2, T3, T4, T5>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
): Composition<T1 | T2 | T3 | T4 | T5>;
export function composeUD<T1, T2, T3, T4, T5, T6>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
	fn6: CompositeUnitSimple<T6>,
): Composition<T1 | T2 | T3 | T4 | T5 | T6>;
export function composeUD<T1, T2, T3, T4, T5, T6, T7>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
	fn6: CompositeUnitSimple<T6>,
	fn7: CompositeUnitSimple<T7>,
): Composition<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
export function composeUD<T1, T2, T3, T4, T5, T6, T7, T8>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
	fn6: CompositeUnitSimple<T6>,
	fn7: CompositeUnitSimple<T7>,
	fn8: CompositeUnitSimple<T8>,
): Composition<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
export function composeUD<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
	fn6: CompositeUnitSimple<T6>,
	fn7: CompositeUnitSimple<T7>,
	fn8: CompositeUnitSimple<T8>,
	fn9: CompositeUnitSimple<T9>,
): Composition<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
export function composeUD<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
	fn6: CompositeUnitSimple<T6>,
	fn7: CompositeUnitSimple<T7>,
	fn8: CompositeUnitSimple<T8>,
	fn9: CompositeUnitSimple<T9>,
	fn10: CompositeUnitSimple<T10>,
): Composition<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
export function composeUD<T = any>(
	...wrappers: CompositeUnitSimple<any>[]
): Composition<T>;
export function composeUD(
	...wrappers: CompositeUnitSimple<any>[]
): Composition<any> {
	return (composeU as any)(...wrappers);
}
