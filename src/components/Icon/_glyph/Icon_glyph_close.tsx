import { IconConstructor } from '../Icon.utils/IconConstructor';

import './Icon_hasGlyph.css';

import IconElement from '../Icon.assets/Material/close.svg';

export interface IModIconGlyphClose {
	glyph?: 'close';
}

export const withModIconGlyphClose = IconConstructor<IModIconGlyphClose>(
	'close',
	IconElement,
);
