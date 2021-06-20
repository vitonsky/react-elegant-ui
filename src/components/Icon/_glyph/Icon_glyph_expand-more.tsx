import { IconConstructor } from '../Icon.utils/IconConstructor';

import './Icon_hasGlyph.css';

import IconElement from '../Icon.assets/Material/expand_more.svg';

export interface IModIconGlyphExpandMore {
	glyph?: 'expand-more';
}

export const withModIconGlyphExpandMore = IconConstructor<IModIconGlyphExpandMore>(
	'expand-more',
	IconElement,
);
