import { Ref, ReactNode, HTMLAttributes } from 'react';

// TODO: remove `I` prefix
// TODO: split and move to dir `features`

/**
 * Basic interface for all renderable components
 */
export interface IComponentElement<
	TElement extends {} = HTMLAttributes<HTMLElement>
> {
	/**
	 * Reference to root element of component
	 */
	innerRef?: Ref<TElement>;

	/**
	 * className to root component
	 */
	className?: string;
}

export interface IComponentHTMLElement<
	TElement extends HTMLElement = HTMLElement
> extends HTMLAttributes<TElement>,
		IComponentElement<TElement> {}

/**
 * Props to insert nodes before and after main elements inside root element
 */
export interface IComponentWithAddonNodes {
	addonBefore?: ReactNode;
	addonAfter?: ReactNode;
}

/**
 * Add property `controlProps` with props for control element
 */
export interface IComponentWithControlProps<T> {
	/**
	 * Props to forward in control
	 */
	controlProps?: T;
}

/**
 * Add property `rootProps` with props for root element
 *
 * It useful when main object contains props for subelement but need give control on wrapper
 */
export interface IComponentWithRootProps<T> {
	/**
	 * Props to forward in root element
	 */
	rootProps?: T;
}

/**
 * Add property `rootProps` with `IComponentElement` props for root element
 *
 * It useful when main object contains props for subelement but need give control on wrapper
 */
export interface IComponentWithComponentRootProps<
	T extends HTMLElement = HTMLElement
> extends IComponentWithRootProps<IComponentHTMLElement<T>> {}
