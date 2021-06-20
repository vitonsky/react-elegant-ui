import { ReactElement } from 'react';

import { IIconProps } from './Icon';

/**
 * Abstraction for provide icons
 */
export type IconProvider = (className: string) => ReactElement<IIconProps>;
