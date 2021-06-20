import React from 'react';
import { ComponentType } from 'react';
import { getDisplayName } from '../getDisplayName';
import { HOCOptions, ConfigurableHOC } from './types';

type Wrapper<T extends {}> = (Component: ComponentType<T>) => ComponentType<T>;

/**
 * Constructor of HOC with options
 *
 * This HOC should use with `compose` or `composeU` or with alternative implementations,
 * which consider a utility props of result wrapper and remove props while not match.
 */
export const withHOCConstructor = <Props extends {}, Origin extends {} = {}>(
	options: HOCOptions<Props>,
	Wrapper: Wrapper<Props & Origin>,
) => {
	const ConfigurableHOC: ConfigurableHOC<Props, Origin> = <P extends {} = {}>(
		Component: ComponentType<P & Props>,
	) => {
		// TODO: fix any if possible
		const WithHOC = Wrapper(Component as ComponentType<any>);

		const WrappedComponent = (props: P & Props & Origin) => {
			return <WithHOC {...props} />;
		};

		WrappedComponent.displayName = getDisplayName(Component);

		return WrappedComponent;
	};

	ConfigurableHOC.__hocOptions = options;

	return ConfigurableHOC;
};
