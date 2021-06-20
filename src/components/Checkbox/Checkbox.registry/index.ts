import { ComponentType } from 'react';

import { ICheckboxBox } from '../Box/Checkbox-Box';
import { ICheckboxControl } from '../Control/Checkbox-Control';
import { ICheckboxTick } from '../Tick/Checkbox-Tick';
import { ICheckboxLabel } from '../Label/Checkbox-Label';

// Icon
import { IIconProps } from '../../Icon/Icon';
import { IModIconGlyphCheckThick } from '../../Icon/_glyph/Icon_glyph_check-thick';
import { IModIconGlyphMinusThick } from '../../Icon/_glyph/Icon_glyph_minus-thick';

export type ICheckboxIcon = IIconProps &
	(IModIconGlyphCheckThick | IModIconGlyphMinusThick);

export interface ICheckboxRegistry {
	Box: ComponentType<ICheckboxBox>;
	Control: ComponentType<ICheckboxControl>;
	Tick: ComponentType<ICheckboxTick>;
	Label: ComponentType<ICheckboxLabel>;
	Icon: ComponentType<ICheckboxIcon>;
}
