import React, { ComponentType, FC } from 'react';

import { getDisplayName } from '../getDisplayName';

import {
	getPrivatePropsFromComposeUnits,
	isMatchHOCProps,
	isMatchProps,
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
// 		const result = Types.join(' & ');
// 		return `export function compose<${generics}>(${args}): Composition<${result}>;`;
// 	})
// 	.join('\n');

/**
 * Compose HOCs
 *
 * Will apply all matched HOCs
 *
 * All private props for unmatched HOCs will removed
 */
export function compose<T1>(fn1: CompositeUnitSimple<T1>): Composition<T1>;
export function compose<T1, T2>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
): Composition<T1 & T2>;
export function compose<T1, T2, T3>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
): Composition<T1 & T2 & T3>;
export function compose<T1, T2, T3, T4>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
): Composition<T1 & T2 & T3 & T4>;
export function compose<T1, T2, T3, T4, T5>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
): Composition<T1 & T2 & T3 & T4 & T5>;
export function compose<T1, T2, T3, T4, T5, T6>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
	fn6: CompositeUnitSimple<T6>,
): Composition<T1 & T2 & T3 & T4 & T5 & T6>;
export function compose<T1, T2, T3, T4, T5, T6, T7>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
	fn6: CompositeUnitSimple<T6>,
	fn7: CompositeUnitSimple<T7>,
): Composition<T1 & T2 & T3 & T4 & T5 & T6 & T7>;
export function compose<T1, T2, T3, T4, T5, T6, T7, T8>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
	fn6: CompositeUnitSimple<T6>,
	fn7: CompositeUnitSimple<T7>,
	fn8: CompositeUnitSimple<T8>,
): Composition<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8>;
export function compose<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
	fn1: CompositeUnitSimple<T1>,
	fn2: CompositeUnitSimple<T2>,
	fn3: CompositeUnitSimple<T3>,
	fn4: CompositeUnitSimple<T4>,
	fn5: CompositeUnitSimple<T5>,
	fn6: CompositeUnitSimple<T6>,
	fn7: CompositeUnitSimple<T7>,
	fn8: CompositeUnitSimple<T8>,
	fn9: CompositeUnitSimple<T9>,
): Composition<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9>;
export function compose<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
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
): Composition<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9 & T10>;
export function compose<T = any>(
	...wrappers: CompositeUnitSimple<any>[]
): Composition<T>;
export function compose(
	...wrappers: CompositeUnitSimple<any>[]
): Composition<any> {
	return (Component) => {
		const componentName = getDisplayName(Component);

		// Reverse array to wrap from last to first and make call stack A,B,C instead C,B,A
		const WrappedComponent = wrappers
			.reverse()
			.reduce((BaseComponent, wrapper) => {
				const WrappedComponent = wrapper(BaseComponent);

				// Just wrap if it simple HOC
				if (!isHOCObject(wrapper)) {
					return WrappedComponent;
				}

				const requirements = wrapper.__hocOptions.matchProps;
				const matchOnlyProps = wrapper.__hocOptions.matchOnlyProps;

				// Return simple wrapper if not have requirements to props
				if (
					requirements === undefined ||
					Object.keys(requirements).length === 0
				) {
					return WrappedComponent;
				}

				// Add display name
				const requirementsHash = getObjectHash(requirements);
				WrappedComponent.displayName = `compose(${componentName})[${requirementsHash}]`;

				// Return manager HOC
				return (props) => {
					// Check props to match
					if (isMatchProps(props, requirements)) {
						const filtredProps = { ...props };

						// Remove match-only props
						if (matchOnlyProps !== undefined) {
							matchOnlyProps.forEach((prop) => {
								delete (filtredProps as any)[prop];
							});
						}

						return <WrappedComponent {...filtredProps} />;
					} else {
						return <BaseComponent {...props} />;
					}
				};
			}, Component as ComponentType);

		// List a private props of HOCs. All private props of not match HOCs will removed
		// Use object instead arr for performance
		const privatePropsDict = getPrivatePropsFromComposeUnits(wrappers);

		const HOC: FC<any> = (props) => {
			const ignoredProps = { ...privatePropsDict };

			// Remove from ignore list a props of matched HOCs
			wrappers.forEach((wrapper) => {
				// Skip simple HOCs
				if (!isHOCObject(wrapper)) {
					return;
				}

				const options = wrapper.__hocOptions;

				// Skip HOCs who not match
				if (!isMatchHOCProps(props, options.matchProps)) {
					return;
				}

				// Remove private props of matched HOCs from ignore list
				getPropsFromHOCOptions(options).forEach((name) => {
					delete ignoredProps[name];
				});
			});

			const localProps = { ...props };

			// Remove a private props of not matched HOCs

			// Do it here but not in big wrapper cuz need check all HOCs to match
			// Otherwise one HOC may unmatch and remove its props, but next HOC
			// will not match due to depends one of it
			Object.keys(ignoredProps).forEach((name) => {
				delete localProps[name];
			});

			return <WrappedComponent {...localProps} />;
		};

		HOC.displayName = `compose(${componentName})`;

		return HOC;
	};
}
