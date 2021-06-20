import { withFocusVisible } from '../../hocs/withFocusVisible';

import { Checkbox as BaseCheckbox, cnCheckbox } from './Checkbox';

export * from './Checkbox';

export const Checkbox = withFocusVisible(cnCheckbox())(BaseCheckbox);
