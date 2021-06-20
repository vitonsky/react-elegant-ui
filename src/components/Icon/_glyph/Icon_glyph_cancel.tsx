import { IconConstructor } from '../Icon.utils/IconConstructor';

import './Icon_hasGlyph.css';

import IconElement from '../Icon.assets/Material/cancel.svg';

export interface IModIconGlyphCancel {
	glyph?: 'cancel';
}

export const withModIconGlyphCancel = IconConstructor<IModIconGlyphCancel>(
	'cancel',
	IconElement,
);
