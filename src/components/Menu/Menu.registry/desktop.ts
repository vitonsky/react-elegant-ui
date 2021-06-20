import { Registry } from '@bem-react/di';

import { withDefaultProps } from '../../../hocs/withDefaultProps';

import { IMenuRegistry } from '.';
import { IMenuSearchRegistry, IMenuSelectedItemRegistry } from './features';

import { cnMenu } from '../Menu';

import { MenuContainer } from '../Container/Menu-Container';
import { MenuGroup } from '../Group/Menu-Group';
import { MenuItem } from '../Item/Menu-Item';
import { ItemText } from '../ItemText/Menu-ItemText';

import { Textinput } from '../../Textinput/Textinput.bundle/desktop';
import { MenuSearch } from '../Search/Menu-Search';

import { ItemContent } from '../ItemContent/Menu-ItemContent';
import { ItemTick } from '../ItemTick/Menu-ItemTick';

// Build icon
import { compose } from '../../../lib/compose';
import { Icon as IconBase } from '../../Icon/Icon';
import { withModIconSizeS } from '../../Icon/_size/Icon_size_s';
import { withModIconGlyphCheck } from '../../Icon/_glyph/Icon_glyph_check';

const Icon = compose(withModIconGlyphCheck, withModIconSizeS)(IconBase);
Icon.defaultProps = {
	size: 's',
	scalable: true,
};

export type IMenuDesktopRegistry = IMenuRegistry &
	IMenuSearchRegistry &
	IMenuSelectedItemRegistry;

export const regObjects: IMenuDesktopRegistry = {
	Container: MenuContainer,
	Group: MenuGroup,
	Item: MenuItem,
	ItemText: ItemText,

	// Search
	Input: withDefaultProps(Textinput, { hasClear: true, size: 's' }),
	SearchInput: MenuSearch,

	// Selected mods
	ItemContent: ItemContent,
	ItemTick: ItemTick,
	ItemIcon: Icon,
};

export const MenuRegistry = new Registry({ id: cnMenu() }).fill(
	regObjects as any,
);
