import React, { FC } from 'react';

import { getDisplayName } from '../getDisplayName';

import {
	getPrivatePropsFromComposeUnits,
	isMatchHOCProps,
	isHOCObject,
	getObjectHash,
	getPropsFromHOCOptions,
} from './utils';
import {
	ComplexUnionToIntersection,
	CompositeUnitSimple,
	Composition,
	InferStructFromCompositeUnit,
} from './types';

export function composeU<T extends CompositeUnitSimple<any>[]>(
	...wrappers: T
): T extends Array<infer X>
	? Composition<ComplexUnionToIntersection<InferStructFromCompositeUnit<X>>>
	: never;
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
