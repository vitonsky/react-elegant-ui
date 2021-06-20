import { IconConstructor } from '../Icon.utils/IconConstructor';

import './Icon_hasGlyph.css';

import IconElement from '../Icon.assets/Material/check.svg';

export interface IModIconGlyphCheck {
	glyph?: 'check';
}

export const withModIconGlyphCheck = IconConstructor<IModIconGlyphCheck>(
	'check',
	IconElement,
);
