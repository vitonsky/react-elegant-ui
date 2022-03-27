import React, { FC } from 'react';

// Components

import {
	View as ButtonView,
	Disabled as ButtonDisabled,
	Size as ButtonSize,
	Types as ButtonTypes,
	WithIcon as ButtonWithIcon,
} from '../../../src/components/Button/__examples__/common.example';

import { Glyphs as IconGlyphs } from '../../../src/components/Icon/__examples__/common.example';

import {
	Base as MenuBase,
	WithSearch as MenuWithSearch,
	Complex as MenuComplex,
	Radio as MenuRadio,
	Checkbox as MenuCheckbox,
	Disabled as MenuDisabled,
} from '../../../src/components/Menu/__examples__/common.example';

import {
	Radio as SelectRadio,
	Checkbox as SelectCheckbox,
	Disabled as SelectDisabled,
	ShadowDOM as SelectShadowDOM,
} from '../../../src/components/Select/__examples__/common.example';

import {
	ViewDefault,
	ViewMotion,
	ViewPrimitive,
} from '../../../src/components/TabsMenu/__examples__/common.example';

import {
	WithTabsMenu as TabsPanesWithTabsMenu,
	WithRenderAll as TabsPanesWithRenderAll,
} from '../../../src/components/TabsPanes/__examples__/common.example';

import {
	Base as TextareaBase,
	WithHint as TextareaWithHint,
	WithClearButton as TextareaWithClearButton,
	WithStateError as TextareaWithStateError,
	WithAutoResize as TextareaWithAutoResize,
	Disabled as TextareaDisabled,
} from '../../../src/components/Textarea/__examples__/common.example';

import {
	Base as TextinputBase,
	WithHint as TextinputWithHint,
	WithClearButton as TextinputWithClearButton,
	WithStateError as TextinputWithStateError,
	WithIcon as TextinputWithIcon,
	Disabled as TextinputDisabled,
} from '../../../src/components/Textinput/__examples__/common.example';

import {
	Hover as PopupHover,
	BigText as PopupBigText,
	VirtualTarget as PopupVirtualTarget,
} from '../../../src/components/Popup/__examples__/common.example';

import {
	BasicExample as ModalBasicExample,
	ComplexExample as ModalComplexExample,
} from '../../../src/components/Modal/__examples__/common.example';

import {
	BaseCheckbox,
	CheckboxInlineExample,
} from '../../../src/components/Checkbox/__examples__/common.example';

import {
	BaseSpinner,
	SpinnerCenter,
	SpinnerSizes,
	SpinnerInComponents,
} from '../../../src/components/Spinner/__examples__/common.example';

import { ComplexPopup as LayerManagerComplexPopup } from '../../../src/components/LayerManager/__examples__/common.example';

// Container
export const ComponentsListing: FC = () => (
	<div>
		<h1>
			<a id="button" href="#button">
				Button
			</a>
		</h1>

		<h2>View</h2>
		<ButtonView />

		<h2>Disabled</h2>
		<ButtonDisabled />

		<h2>Types</h2>
		<ButtonTypes />

		<h2>Size</h2>
		<ButtonSize />

		<h2>Icon</h2>
		<ButtonWithIcon />

		<h1>
			<a id="checkbox" href="#checkbox">
				Checkbox
			</a>
		</h1>

		<h2>Base</h2>
		<BaseCheckbox />

		<h2>Inline</h2>
		<CheckboxInlineExample />

		<h1>
			<a id="icon" href="#icon">
				Icon
			</a>
		</h1>

		<h2>Glyphs</h2>
		<IconGlyphs />

		<h1>
			<a id="spinner" href="#spinner">
				Spinner
			</a>
		</h1>

		<h2>Base</h2>
		<BaseSpinner />

		<h2>Sizes</h2>
		<SpinnerSizes />

		<h2>With components</h2>
		<SpinnerInComponents />

		<h2>Position center</h2>
		<SpinnerCenter />

		<h1>
			<a id="LayerManager" href="#LayerManager">
				LayerManager
			</a>
		</h1>

		<h2>Complex popups</h2>
		<LayerManagerComplexPopup />

		<h1>
			<a id="popup" href="#popup">
				Popup
			</a>
		</h1>

		<h2>Hover</h2>
		<PopupHover />

		<h2>Big text</h2>
		<PopupBigText />

		<h2>Virtual target</h2>
		<PopupVirtualTarget />

		<h1>
			<a id="modal" href="#modal">
				Modal
			</a>
		</h1>

		<h2>Basic example</h2>
		<ModalBasicExample />

		<h2>Complex example</h2>
		<ModalComplexExample />

		<h1>
			<a id="menu" href="#menu">
				Menu
			</a>
		</h1>

		<h2>Base</h2>
		<MenuBase />
		<h2>With search</h2>
		<MenuWithSearch />
		<h2>Complex</h2>
		<MenuComplex />
		<h2>Radio</h2>
		<MenuRadio />
		<h2>Checkbox</h2>
		<MenuCheckbox />
		<h2>Disabled</h2>
		<MenuDisabled />

		<h1>
			<a id="select" href="#select">
				Select
			</a>
		</h1>

		<h2>Radio</h2>
		<SelectRadio />
		<h2>Checkbox</h2>
		<SelectCheckbox />
		<h2>Disabled</h2>
		<SelectDisabled />
		<h2>ShadowDOM</h2>
		<SelectShadowDOM />

		<h1>
			<a href="tabsmenu" id="tabsmenu">
				TabsMenu
			</a>
		</h1>

		<h2>View motion</h2>
		<ViewMotion />

		<h2>View default</h2>
		<ViewDefault />

		<h2>View primitive</h2>
		<ViewPrimitive />

		<h1>
			<a href="tabspane" id="tabspane">
				TabsPane
			</a>
		</h1>

		<h2>Default</h2>
		<TabsPanesWithTabsMenu />

		<h2>With renderAll</h2>
		<TabsPanesWithRenderAll />

		<h1>
			<a href="textarea" id="textarea">
				Textarea
			</a>
		</h1>

		<h2>Base</h2>
		<TextareaBase />

		<h2>Disabled</h2>
		<TextareaDisabled />

		<h2>Auto resize</h2>
		<TextareaWithAutoResize />

		<h2>Hint</h2>
		<TextareaWithHint />

		<h2>Clear button</h2>
		<TextareaWithClearButton />

		<h2>Error state</h2>
		<TextareaWithStateError />

		<h1>
			<a href="textinput" id="textinput">
				Textinput
			</a>
		</h1>

		<h2>Base</h2>
		<TextinputBase />

		<h2>Disabled</h2>
		<TextinputDisabled />

		<h2>Hint</h2>
		<TextinputWithHint />

		<h2>Clear button</h2>
		<TextinputWithClearButton />

		<h2>With icon</h2>
		<TextinputWithIcon />

		<h2>Error state</h2>
		<TextinputWithStateError />
	</div>
);
