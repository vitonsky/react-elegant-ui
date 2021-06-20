import { compose, composeU, ExtractProps } from '../../../lib/compose';

import { Icon as BaseIcon } from '../Icon';

// _glyph
import { withModIconGlyphUnfoldMore } from '../_glyph/Icon_glyph_unfold-more';
import { withModIconGlyphExpandMore } from '../_glyph/Icon_glyph_expand-more';
import { withModIconGlyphClose } from '../_glyph/Icon_glyph_close';
import { withModIconGlyphCheck } from '../_glyph/Icon_glyph_check';
import { withModIconGlyphCancel } from '../_glyph/Icon_glyph_cancel';
import { withModIconGlyphCheckThick } from '../_glyph/Icon_glyph_check-thick';
import { withModIconGlyphMinusThick } from '../_glyph/Icon_glyph_minus-thick';

// _size
import { withModIconSizeS } from '../_size/Icon_size_s';
import { withModIconSizeM } from '../_size/Icon_size_m';
import { withModIconSizeL } from '../_size/Icon_size_l';
import { withModIconSizeXL } from '../_size/Icon_size_xl';
import { withModIconSizeXS } from '../_size/Icon_size_xs';

export * from '../Icon';

export const Icon = compose(
	composeU(
		withModIconGlyphUnfoldMore,
		withModIconGlyphExpandMore,
		withModIconGlyphClose,
		withModIconGlyphCheck,
		withModIconGlyphCancel,
		withModIconGlyphCheckThick,
		withModIconGlyphMinusThick,
	),
	composeU(
		withModIconSizeS,
		withModIconSizeM,
		withModIconSizeL,
		withModIconSizeXL,
		withModIconSizeXS,
	),
)(BaseIcon);

Icon.defaultProps = {
	// Default design require resizeable icon, cuz is not define static sizes,
	// instead this just set default size for icon wrapper
	scalable: true,
	size: 'm',
};

export type IIconProps = ExtractProps<typeof Icon>;
