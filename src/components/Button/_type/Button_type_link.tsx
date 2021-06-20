// Imported from yandex-ui. Source: https://github.com/bem/yandex-ui/

import React from 'react';

import { withHOCConstructor } from '../../../lib/compose';

import { IButtonProps, cnButton } from '../Button';

export interface IModButtonTypeLink {
	/**
	 * Type of element. This parameter is define a behavior
	 */
	type?: 'link';

	/**
	 * Address of link
	 */
	url?: string;

	/**
	 * Behavior who define where show content of link
	 */
	target?: string;

	/**
	 * Relations between links
	 */
	rel?: string;

	/**
	 * @internal
	 */
	href?: string;

	/**
	 * HTML-attribute tabIndex. It's define a order of switching between elements by press on Tab
	 */
	tabIndex?: number;
}

/**
 * @param {IModButtonTypeLink} props
 */
export const withModButtonTypeLink = withHOCConstructor<
	IModButtonTypeLink,
	IButtonProps
>(
	{
		matchProps: { type: 'link' },
		privateProps: ['type', 'url', 'target', 'rel', 'href'],
	},
	(WrappedComponent) => {
		return ({
			type,
			target,
			rel,
			url,
			disabled,
			tabIndex,
			className,
			...props
		}) => {
			let relationship = rel;

			if (
				target === '_blank' &&
				rel !== undefined &&
				rel.indexOf('noopener') === -1
			) {
				// User attribut have more priority
				relationship = `${rel} noopener`;
			}

			return (
				<WrappedComponent
					{...props}
					className={cnButton({ type }, [className])}
					rel={relationship}
					target={target}
					disabled={disabled}
					href={disabled ? undefined : url}
					tabIndex={disabled ? -1 : tabIndex}
					as="a"
				/>
			);
		};
	},
);
