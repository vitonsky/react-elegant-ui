import { Registry } from '@bem-react/di';

import { withDefaultProps } from '../../../hocs/withDefaultProps';

// Interfaces
import { ISelectRegistry as ISelectRegistryBase } from '.';
import {
	ISelectButtonTriggerRegistry,
	ISelectNativeControlRegistry,
} from './features';

// Artefacts
import { Button } from '../../Button/Button.bundle/desktop';
import { Icon } from '../../Icon/Icon.bundle/desktop';

import { cnSelect } from '../Select';
import { SelectTrigger } from '../Trigger/Select-Trigger';
import { SelectNativeControl } from '../NativeControl/Select-NativeControl';

export type ISelectTouchRegistry = ISelectRegistryBase &
	ISelectButtonTriggerRegistry &
	ISelectNativeControlRegistry;

export const regObjects: ISelectTouchRegistry = {
	Button: withDefaultProps(Button, {
		view: 'default',
		size: 'm',
	}),
	Icon: withDefaultProps(Icon, {
		glyph: 'unfold-more',
		size: 's',
	}),

	Trigger: SelectTrigger,
	NativeControl: SelectNativeControl,
};

export const SelectTouchRegistry = new Registry({ id: cnSelect() }).fill(
	regObjects as any,
);
