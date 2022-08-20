import { withRegistry } from '../../../lib/di';

import { compose, composeU, ExtractProps } from '../../../lib/compose';

import { Menu as MenuDesktop } from '../Menu@desktop';

import { withInlineSearch } from '../Menu.hocs/withInlineSearch';
import { withCursorState } from '../Menu.hocs/withCursorState';

// registry
import { MenuRegistry } from '../Menu.registry/desktop';

// _searchable
import { withModMenuSearchable } from '../_searchable/Menu_searchable';

// _view
import { withModMenuViewDefault } from '../_view/Menu_view_default';
import { withModMenuViewAction } from '../_view/Menu_view_action';

// _size
import { withModMenuSizeS } from '../_size/Menu_size_s';
import { withModMenuSizeM } from '../_size/Menu_size_m';
import { withModMenuSizeL } from '../_size/Menu_size_l';

// _type
import { withModMenuTypeRadio } from '../_type/Menu_type_radio';
import { withModMenuTypeCheckbox } from '../_type/Menu_type_checkbox';

export * from '../Menu@desktop';

export const Menu = compose(
	withRegistry(MenuRegistry),
	withCursorState,
	withModMenuSearchable,
	withInlineSearch,
	composeU(withModMenuSizeS, withModMenuSizeM, withModMenuSizeL),
	composeU(withModMenuViewDefault, withModMenuViewAction),
	composeU(withModMenuTypeRadio, withModMenuTypeCheckbox),
)(MenuDesktop);

Menu.defaultProps = { view: 'default', size: 'm', inlineSearch: true };

export type IMenuProps = ExtractProps<typeof Menu>;
