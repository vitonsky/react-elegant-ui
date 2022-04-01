import React from 'react';
import { cn } from '@bem-react/classname';

import { excludeProps } from '../excludeProps';
import { withHOCConstructor } from './withHOCConstructor';

// TODO: introduce option `visualModifiers` to get props by names from array and build className from its
/**
 * Make visual HOC which by match exclude specified props and convert to className
 */
export const withClassnameHOC = <Props extends {} = {}, Origin extends {} = {}>(
	blockName: string,
	matchProps: Props,
) =>
		withHOCConstructor<Props, Origin>(
			{
				matchProps,
				privateProps: Object.keys(matchProps) as any,
			},
			(Component) => (props) => {
				const { className } = props as typeof props & {
				className?: string;
			};
				const newProps = excludeProps(props, Object.keys(matchProps));
				return (
					<Component
						{...newProps}
						className={cn(blockName)(matchProps, [className as string])}
					/>
				);
			},
		);
