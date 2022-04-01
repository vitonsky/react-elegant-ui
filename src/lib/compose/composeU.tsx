import React, { FC } from 'react';

import {
	DeepUnion2,
	DeepUnion3,
	DeepUnion4,
	DeepUnion5,
	DeepUnion6,
	DeepUnion7,
	DeepUnion8,
	DeepUnion9,
	DeepUnion10,
} from '../../types/union';
import { getDisplayName } from '../getDisplayName';

import {
	getPrivatePropsFromComposeUnits,
	isMatchHOCProps,
	isHOCObject,
	getObjectHash,
	getPropsFromHOCOptions,
} from './utils';
import { CompositeUnitSimple, Composition } from './types';

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
// 		const result =
// 			num == 1 ? Types[0] : `DeepUnion${num}<${Types.join(', ')}>`;
// 		return `export function composeU<${generics}>(${args}): Composition<${result}>;`;
// 	})
// 	.join('\n');

/**
 * Compose HOCs with union props
 *
 * Will apply firsh matched HOC
 *
 * All private props for unmatched HOCs will removed
 */
export function composeU<T1>(fn1: CompositeUnitSimple<T1>): Composition<T1>;
export function composeU<T1, T2>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
): Composition<DeepUnion2<T1, T2>>;
export function composeU<T1, T2, T3>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
): Composition<DeepUnion3<T1, T2, T3>>;
export function composeU<T1, T2, T3, T4>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
): Composition<DeepUnion4<T1, T2, T3, T4>>;
export function composeU<T1, T2, T3, T4, T5>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
): Composition<DeepUnion5<T1, T2, T3, T4, T5>>;
export function composeU<T1, T2, T3, T4, T5, T6>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
	fn6: CompositeUnitSimple<T6>,
): Composition<DeepUnion6<T1, T2, T3, T4, T5, T6>>;
export function composeU<T1, T2, T3, T4, T5, T6, T7>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
	fn6: CompositeUnitSimple<T6>,
	fn7: CompositeUnitSimple<T7>,
): Composition<DeepUnion7<T1, T2, T3, T4, T5, T6, T7>>;
export function composeU<T1, T2, T3, T4, T5, T6, T7, T8>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
	fn6: CompositeUnitSimple<T6>,
	fn7: CompositeUnitSimple<T7>,
	fn8: CompositeUnitSimple<T8>,
): Composition<DeepUnion8<T1, T2, T3, T4, T5, T6, T7, T8>>;
export function composeU<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
	fn6: CompositeUnitSimple<T6>,
	fn7: CompositeUnitSimple<T7>,
	fn8: CompositeUnitSimple<T8>,
	fn9: CompositeUnitSimple<T9>,
): Composition<DeepUnion9<T1, T2, T3, T4, T5, T6, T7, T8, T9>>;
export function composeU<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
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
): Composition<DeepUnion10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>>;
export function composeU<T = any>(
	...wrappers: CompositeUnitSimple<any>[]
): Composition<T>;
export function composeU(
	...wrappers: CompositeUnitSimple<any>[]
): Composition<any> {
	return (Component) => {
		const componentName = getDisplayName(Component);

		// Make cache where each wrapper apply to base component once
		const wrappedComponents = wrappers.map((wrapper) => {
			const WrappedComponent = wrapper(Component);

			// Just wrap if it simple HOC
			if (!isHOCObject(wrapper)) {
				return WrappedComponent;
			}

			// Add display name
			const requirements = wrapper.__hocOptions.matchProps;
			const requirementsHash = getObjectHash(requirements);
			WrappedComponent.displayName = `composeU(${componentName})[${requirementsHash}]`;

			return WrappedComponent;
		});

		// List a private props of HOCs. All private props of not match HOCs will removed
		// Use object instead arr for performance
		const privatePropsDict = getPrivatePropsFromComposeUnits(wrappers);

		const HOC: FC<any> = (props) => {
			// Find first matched wrapper
			const matchedIndex = wrappers.findIndex(
				(wrapper) =>
					!isHOCObject(wrapper) ||
					isMatchHOCProps(props, wrapper.__hocOptions.matchProps),
			);

			const selectedWrapper = wrappers[matchedIndex];

			const ignoredProps = { ...privatePropsDict };

			// Remove from ignore list a props of matched HOC
			if (selectedWrapper !== undefined && isHOCObject(selectedWrapper)) {
				const options = selectedWrapper.__hocOptions;
				getPropsFromHOCOptions(options).forEach((name) => {
					// Leave as private a props defined as match-only
					if (
						options.matchOnlyProps !== undefined &&
						options.matchOnlyProps.indexOf(name) > -1
					) {
						return;
					}

					delete ignoredProps[name];
				});
			}

			const localProps = { ...props };

			// Remove a private props of not matched HOCs
			Object.keys(ignoredProps).forEach((name) => {
				delete localProps[name];
			});

			const NewComponent = wrappedComponents[matchedIndex] || Component;
			return <NewComponent {...localProps} />;
		};

		HOC.displayName = `composeU(${componentName})`;

		return HOC;
	};
}
