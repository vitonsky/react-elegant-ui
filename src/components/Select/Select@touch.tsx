import { FC } from 'react';

import { withNativeControl } from './Select.hocs/withNativeControl';

import { ISelectProps, Select as BaseSelect } from './Select';

export * from './Select';

// TODO: implement modal window with menu for mobile touch devices

/**
 * Render native select for mobile touch devices only
 *
 * WARNING: don't use this for desktop because:
 * - This control is not accessible from keyboard. It's just click hack (clickjacking) of native control
 * - Native control with `multiple` attribute looks absolutely different and can't use on desktop and it even don't show by click
 */
export const Select: FC<ISelectProps> = withNativeControl(BaseSelect);
