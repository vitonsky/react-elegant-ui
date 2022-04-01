import React, { ComponentType, FC } from 'react';

import {
	getPrivatePropsFromComposeUnits,
	isMatchHOCProps,
	isMatchProps,
	isHOCObject,
	getObjectHash,
	getPropsFromHOCOptions,
} from './utils';
import {
	CompositeUnitSimple,
	Composition,
	InferStructFromCompositeUnit,
} from './types';

import { getDisplayName } from '../getDisplayName';
import { UnionToIntersection } from '../../types/utility-types';

/**
 * Compose HOCs
 *
 * Will apply all matched HOCs
 *
 * All private props for unmatched HOCs will removed
 */
export function compose<T extends CompositeUnitSimple<any>[]>(
	...wrappers: T
): T extends Array<infer X>
	? Composition<UnionToIntersection<InferStructFromCompositeUnit<X>>>
	: never;
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
