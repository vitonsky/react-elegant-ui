import { ComponentType } from 'react';
import { Registry } from '../../../lib/di';

import { withDefaultProps } from '../../../hocs/withDefaultProps';

// Interfaces
import { ISelectRegistry as ISelectRegistryBase } from '.';
import { ISelectButtonTriggerRegistry } from './features';

// Artefacts
import { Button } from '../../Button/Button.bundle/desktop';
import { Icon } from '../../Icon/Icon.bundle/desktop';
import { Popup } from '../../Popup/Popup.bundle/desktop';
import { Menu } from '../../Menu/Menu.bundle/desktop';
import {
	applyMaxHeight,
	applyMinWidth,
} from '../../../hooks/behavior/usePopper';

import { cnSelect } from '../Select@desktop';
import { SelectTrigger } from '../Trigger/Select-Trigger';
import { ISelectList, SelectList } from '../List/Select-List';
import { ISelectPopup, SelectPopup } from '../Popup/Select-Popup';

// TODO: improve interfaces. Reference to different types for inner and outer
export interface ISelectDesktopRegistry
	extends ISelectRegistryBase,
		ISelectButtonTriggerRegistry {
	PopupComponent: ComponentType<ISelectPopup>;
	Popup: ComponentType<ISelectPopup>;
	Menu: ComponentType<ISelectList>;
	List: ComponentType<ISelectList>;
}

export const regObjects: ISelectDesktopRegistry = {
	Trigger: SelectTrigger,

	// ButtonTrigger features
	Button: withDefaultProps(Button, {
		view: 'default',
		size: 'm',
	}),
	Icon: withDefaultProps(Icon, {
		glyph: 'unfold-more',
		size: 's',
	}),

	// Desktop features
	PopupComponent: withDefaultProps(Popup, {
		// at the moment `applyMaxHeight` decrease block size while scroll, it's bug
		modifiers: [applyMaxHeight, applyMinWidth],
		view: 'default',
	}),
	Popup: SelectPopup,
	Menu: withDefaultProps(Menu, { size: 'm', isRenderHidden: true }),
	List: SelectList,
};

export const SelectDesktopRegistry = new Registry({ id: cnSelect() }).fill(
	regObjects as any,
);
