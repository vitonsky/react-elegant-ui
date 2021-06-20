import { IconConstructor } from '../Icon.utils/IconConstructor';

import './Icon_hasGlyph.css';

import IconElement from '../Icon.assets/Material/unfold_more.svg';

export interface IModIconGlyphUnfoldMore {
	glyph?: 'unfold-more';
}

export const withModIconGlyphUnfoldMore = IconConstructor<IModIconGlyphUnfoldMore>(
	'unfold-more',
	IconElement,
);
