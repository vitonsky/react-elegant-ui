import { IconConstructor } from '../Icon.utils/IconConstructor';

import './Icon_hasGlyph.css';

import IconElement from '../Icon.assets/Font-Awesome/Minus.svg';

export interface IModIconGlyphMinusThick {
	glyph?: 'minus-thick';
}

export const withModIconGlyphMinusThick = IconConstructor<IModIconGlyphMinusThick>(
	'minus-thick',
	IconElement,
);
