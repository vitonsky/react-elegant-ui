import React, { FC } from 'react';
import { cn } from '@bem-react/classname';

import './Icon.css';
import { IComponentHTMLElement } from '../../types/IComponent';

export interface IIconProps extends IComponentHTMLElement<HTMLDivElement> {
	/**
	 * Scale icon to any size. With off will keep static size
	 */
	scalable?: boolean;

	/**
	 * URL to picture or picture encoded to base64
	 */
	url?: string;
}

export const cnIcon = cn('Icon');

export const Icon: FC<IIconProps> = ({
	url,
	scalable,
	style = {},
	children,
	className,
	innerRef,
	...props
}) => {
	if (url !== undefined) {
		style.backgroundImage = `url('${url}')`;
	}

	return (
		<span
			{...props}
			ref={innerRef}
			aria-hidden
			className={cnIcon({ scalable }, [className])}
			style={style}
		>
			{children}
		</span>
	);
};

Icon.displayName = cnIcon();
