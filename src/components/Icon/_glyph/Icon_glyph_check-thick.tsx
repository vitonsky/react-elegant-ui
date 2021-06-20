import { IconConstructor } from '../Icon.utils/IconConstructor';

import './Icon_hasGlyph.css';

import IconElement from '../Icon.assets/Font-Awesome/Check.svg';

export interface IModIconGlyphCheckThick {
	glyph?: 'check-thick';
}

export const withModIconGlyphCheckThick = IconConstructor<IModIconGlyphCheckThick>(
	'check-thick',
	IconElement,
);
