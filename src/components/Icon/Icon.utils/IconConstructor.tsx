import React, { ComponentType, SVGProps } from 'react';

import { withHOCConstructor } from '../../../lib/compose';

import { IIconProps, cnIcon } from '../Icon';

/**
 * Helper to build icon modifier
 */
export const IconConstructor = <
	T extends { glyph?: string },
	P extends IIconProps = IIconProps
>(
		glyph: T['glyph'] extends infer X
		? X extends undefined
			? never
			: X
		: never,
		IconElement: ComponentType<SVGProps<SVGSVGElement>>,
	) =>
		withHOCConstructor<T, P>(
			{
				matchProps: ({ glyph } as unknown) as Partial<T>,
				privateProps: [glyph as any],
			},
			(Icon) => ({ className, glyph, ...props }) => (
				<Icon
					{...(props as T & P)}
					className={cnIcon({ hasGlyph: true, glyph }, [className])}
				>
					<IconElement />
				</Icon>
			),
		);
