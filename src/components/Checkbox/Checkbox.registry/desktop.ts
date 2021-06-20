import { Registry } from '@bem-react/di';

import { ICheckboxRegistry } from '.';
import { CheckboxBox } from '../Box/Checkbox-Box';
import { CheckboxControl } from '../Control/Checkbox-Control';
import { CheckboxTick } from '../Tick/Checkbox-Tick';
import { CheckboxLabel } from '../Label/Checkbox-Label';
import { cnCheckbox } from '../Checkbox';

// Build icon
import { compose, composeU } from '../../../lib/compose';
import { Icon as IconBase } from '../../Icon/Icon';
import { withModIconSizeM } from '../../Icon/_size/Icon_size_m';
import { withModIconGlyphCheckThick } from '../../Icon/_glyph/Icon_glyph_check-thick';
import { withModIconGlyphMinusThick } from '../../Icon/_glyph/Icon_glyph_minus-thick';

const Icon = compose(
	composeU(withModIconGlyphCheckThick, withModIconGlyphMinusThick),
	withModIconSizeM,
)(IconBase);

export { ICheckboxRegistry as ICheckboxDesktopRegistry } from '.';

export const regObjects: ICheckboxRegistry = {
	Box: CheckboxBox,
	Control: CheckboxControl,
	Tick: CheckboxTick,
	Label: CheckboxLabel,
	Icon,
};

export const CheckboxDesktopRegistry = new Registry({ id: cnCheckbox() }).fill(
	regObjects as any,
);
