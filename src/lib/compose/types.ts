import { ComponentType, FC } from 'react';

// Prettier can't parse `as` keyword for keys
export type FilterByKeys<T, F = any> = {
	[K in keyof T as K extends F ? K : never]: T[K];
};

// TODO: add option `requiredProps` to define a names of props who must have
// It will alternative to `matchProps` but require exists props names but not values
// TODO: add option `deps`, to define props which must never remove for matched HOC
// even if not specify as `matchProps` or `privateMatchProps`
/**
 * Interface of HOC options
 */
export interface HOCOptions<S extends {}> {
	/**
	 * State to call HOC. Empty mean any
	 *
	 * When props is not match - will render default component
	 */
	matchProps?: Partial<S>;

	/**
	 * Make private all props from option `matchProps`
	 *
	 * It alternative to manually specifying all props from `matchProps` to `privateProps`
	 */
	privateMatchProps?: boolean;

	/**
	 * Array of all props names unique for this HOC
	 *
	 * Here should specify only props defined of HOC, but not common props!
	 *
	 * This props will removed when HOC is not match and other matched HOCs in compose unit
	 * is not specified it as `matchProps` or `privateProps`
	 */
	privateProps?: Exclude<keyof FilterByKeys<S, string>, symbol | number>[];

	/**
	 * Array of props names that never be forward.
	 *
	 * Useful for props who will trigger match, but will not use in HOC
	 */
	matchOnlyProps?: Exclude<keyof FilterByKeys<S, string>, symbol | number>[];
}

/**
 * Interface of HOC. It's function with property contains a HOC options
 */
export type ConfigurableHOC<
	HOCProps extends {},
	OriginProps extends {} = {},
> = {
	<P extends {} = {}>(Component: ComponentType<P & HOCProps>): ComponentType<
		P & HOCProps & OriginProps
	>;
	__hocOptions: HOCOptions<HOCProps>;
};

export type HOC<T> = (WrappedComponent: ComponentType) => ComponentType<T>;

/**
 * Simply HOC for compose. It can be use instead `ConfigurableHOC`
 */
export type SimplyHOC<Props extends {}, Origin extends {} = {}> = <
	P extends {} = {},
>(
	Component: ComponentType<P & Props>,
) => ComponentType<P & Props & Origin>;

/**
 * Object for composer
 *
 * Fake version. It's just HOC. It use cuz TS is can't infer generic type from union `HOC | ConfigurableHOC`
 * Real type name is `CompositeUnit`
 */
export type CompositeUnitSimple<T> = HOC<T>;

/**
 * Object for composer
 */
export type CompositeUnit<T> = ConfigurableHOC<T> | HOC<T>;

/**
 * Helper to extract props from `ComponentType`
 */
export type ExtractProps<T> = T extends ComponentType<infer K>
	? {
			[P in keyof K]: K[P];
	  }
	: never;

/**
 * Result of composing
 *
 * This type also help infer types and show pretty props list instead generic names
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#support-for-defaultprops-in-jsx
 */
export type Composition<T> = <U extends ComponentType<any>>(
	fn: U,
) => FC<JSX.LibraryManagedAttributes<U, ExtractProps<U>> & T>;

/**
 * Useful to infer type from `CompositeUnitSimple`
 *
 * It may use with union types to apply for each naked type in union
 */
export type InferStructFromCompositeUnit<T> = T extends CompositeUnitSimple<
	infer X
>
	? X extends {}
		? X
		: never
	: T;
