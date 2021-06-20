import { ComponentType } from 'react';

import { IButtonProps } from '../../Button/Button';
import { IIconProps } from '../../Icon/Icon';
import { ISelectNativeControl } from '../NativeControl/Select-NativeControl';

export interface ISelectButtonTriggerRegistry {
	Button: ComponentType<IButtonProps>;
	Icon: ComponentType<IIconProps>;
}

export interface ISelectNativeControlRegistry {
	NativeControl: ComponentType<ISelectNativeControl>;
}
