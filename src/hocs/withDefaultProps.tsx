import React, { ComponentType } from 'react';

import { OptionalKeys } from '../types/utility-types';

/**
 * Create wrapper with default props
 *
 * It need only when you want clone component and set default props for it
 *
 * Don't use it to set default props for component object, instead set static property `defaultProps`
 */
export const withDefaultProps = <T extends Object>(
	WrappedComponent: ComponentType<T>,
	defaultProps: OptionalKeys<T>,
): ComponentType<T> => (props) => (
		<WrappedComponent {...defaultProps} {...props} />
	);
