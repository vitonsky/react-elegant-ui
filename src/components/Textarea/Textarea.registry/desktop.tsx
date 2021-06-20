import React, { FC } from 'react';
import { Registry } from '@bem-react/di';

import { IComponentHTMLElement } from '../../../types/IComponent';

import { ITextareaRegistry } from '.';
import { ITextareaClearRegistry } from './features';

import { cnTextarea } from '../Textarea';

import { TextareaWrap } from '../Wrap/Textarea-Wrap';
import { TextareaControl } from '../Control/Textarea-Control';
import { TextareaBox } from '../Box/Textarea-Box';
import { TextareaHint } from '../Hint/Textarea-Hint';
import { TextareaClear } from '../Clear/Textarea-Clear';

// Build icon
import { compose } from '../../../lib/compose';
import { Icon as IconBase } from '../../Icon/Icon';
import { withModIconGlyphCancel } from '../../Icon/_glyph/Icon_glyph_cancel';
import { withModIconSizeM } from '../../Icon/_size/Icon_size_m';

const Icon = compose(withModIconGlyphCancel, withModIconSizeM)(IconBase);
const IconProvider: FC<IComponentHTMLElement<HTMLDivElement>> = ({
	className,
	children,
	...props
}) => <Icon {...props} className={className} glyph="cancel" size="m" />;

export interface ITextareaDesktopRegistry<
	T extends {
		ClearIcon: HTMLElement;
		Clear: HTMLElement;
	} = {
		ClearIcon: HTMLDivElement;
		Clear: HTMLElement;
	}
> extends ITextareaRegistry,
		ITextareaClearRegistry<T> {}

export const regObjects: ITextareaDesktopRegistry = {
	Wrap: TextareaWrap,
	Control: TextareaControl,
	Box: TextareaBox,
	Hint: TextareaHint,

	// Feature
	ClearIcon: IconProvider,
	Clear: TextareaClear,
};

export const TextareaRegistry = new Registry({ id: cnTextarea() }).fill(
	regObjects as any,
);
