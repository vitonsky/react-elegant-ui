import React, { FC, HTMLAttributes } from 'react';
import { Registry } from '@bem-react/di';

import { ITextinputRegistry } from '.';
import { ITextinputClearRegistry } from './features';
import { cnTextinput } from '../Textinput';

import { TextinputWrap } from '../Wrap/Textinput-Wrap';
import { TextinputControl } from '../Control/Textinput-Control';
import { TextinputBox } from '../Box/Textinput-Box';
import { TextinputHint } from '../Hint/Textinput-Hint';
import { TextinputIcon } from '../Icon/Textinput-Icon';
import { TextinputClear } from '../Clear/Textinput-Clear';

// Build icon
import { compose } from '../../../lib/compose';
import { Icon as IconBase } from '../../Icon/Icon';
import { withModIconGlyphCancel } from '../../Icon/_glyph/Icon_glyph_cancel';
import { withModIconSizeM } from '../../Icon/_size/Icon_size_m';

const Icon = compose(withModIconGlyphCancel, withModIconSizeM)(IconBase);
const IconProvider: FC<HTMLAttributes<HTMLElement>> = ({
	className,
	children,
	...props
}) => <Icon {...props} className={className} glyph="cancel" size="m" />;

export interface ITextinputDesktopRegistry
	extends ITextinputRegistry,
		ITextinputClearRegistry {}

export const regObjects: ITextinputDesktopRegistry = {
	Wrap: TextinputWrap,
	Control: TextinputControl,
	Box: TextinputBox,
	Hint: TextinputHint,
	Icon: TextinputIcon,

	// Feature
	ClearIcon: IconProvider,
	Clear: TextinputClear,
};

export const TextinputDesktopRegistry = new Registry({
	id: cnTextinput(),
}).fill(regObjects as any);
