import { ComponentType } from 'react';

// Search
import { ITextinputProps } from '../../Textinput/Textinput';
import { IModTextinputHasClearProps } from '../../Textinput/_hasClear/Textinput_hasClear';

import { IMenuSearch } from '../Search/Menu-Search';

// Selected mods
import { IItemContent } from '../ItemContent/Menu-ItemContent';
import { IItemTick } from '../ItemTick/Menu-ItemTick';

import { IIconProps } from '../../Icon/Icon';
import { IModIconGlyphCheck } from '../../Icon/_glyph/Icon_glyph_check';

export type Input = ITextinputProps & IModTextinputHasClearProps;

export interface IMenuSearchRegistry {
	Input: ComponentType<Input>;
	SearchInput: ComponentType<IMenuSearch>;
}

export interface IMenuSelectedItemRegistry {
	ItemContent: ComponentType<IItemContent>;
	ItemTick: ComponentType<IItemTick>;
	ItemIcon: ComponentType<IIconProps & IModIconGlyphCheck>;
}
