# Getting started

Read introduction to understand terms and structure of package and components.

## Install

Install package and peer deps

`npm install react-elegant-ui @bem-react/classname react`

## Basic usage

Each component have a ready-made bundle with all features, you can use it.

It useful for prototyping, library overview, developer purposes, for see on code samples. But should not use it in your real projects, better make your own components bundles.

Use library in your application:

```JSX
import React, { useState } from 'react';

// Import prebuilded components with all features
import { Textinput } from 'react-elegant-ui/esm/components/Textinput/Textinput.bundle/desktop';
import { Button } from 'react-elegant-ui/esm/components/Button/Button.bundle/desktop';

import { configureRootTheme } from 'react-elegant-ui/esm/theme';
import { theme } from 'react-elegant-ui/esm/theme/presets/default';

// Use global theme. It's client side only feature
configureRootTheme({ theme });

export const Example = () => {
  const [name, setName] = useState('');
  const clear = () => setName('');

  const clickHandler = () => console.log(name ? `Hello, ${name}` : 'Input your name');

  return <div>
    <Textinput
      placeholder="Input your name"
      value={name}
      setValue={setName}
      hasClear
      onClearClick={clear}
    />
    <Button view="action" onClick={clickHandler}>Say my name</Button>
	</div>;
}
```

Then just build it in your favorite bundler and use.

You will require bundler modules for handle JS or TSX, CSS and for convert SVG files to components.

If you have problems with build process, see webpack config in examples and make issue if it not resolve your problem.

## Advanced usage

Main feature of this components is architecture which split components to features and allow you use components with only features which you really need.

For example, when you make page for smartphones, usually you are not necessary features which implement keyboard navigation different of pages for desktop and you want use native select control instead custom and probably bigger buttons.

You can handle useragent header of requests on server side and give bundles depends of it. For smartphons one for desktop browsers other, for old browsers give bundle with polyfils and fallbacks, for modern - with all modern features.

This way allow you decrease bundle size, speed up page loading and use experements, when you test features on part of users.

If you don't want it, it's fine, just use one bundle everywhere if you want but for you it useful too.

This architecture mean also that you can add new features to exists components or replace implementation of some features.

You need menu with search input down of menu, and by default exists feature with search input but this input add before menu and it not satisfied you? It's not problem, because you can fix it very simply and fast, just take source code of this feature from repo, change as you wish and build component with your implementation of this feature. It take about 5 minuts.

### Build

All that you need to use component with some features is compose component and features which you need. That builds named a bundles.

Example of build in your project file `myApp/components/Button/Button.bundle/desktop.ts`

```tsx
// Import tools from compose library
import {
	compose,
	composeU,
	ExtractProps,
} from 'react-elegant-ui/esm/lib/compose';

// Import tool from DI library
// See docs: https://github.com/bem/bem-react/tree/master/packages/di
import { withRegistry } from 'react-elegant-ui/esm/lib/di';

// Import base component
import { Button as DesktopButton } from 'react-elegant-ui/esm/components/Button/Button@desktop';

// DI registry object
import { ButtonDesktopRegistry } from 'react-elegant-ui/esm/components/Button/Button.registry/desktop';

// Modifiers view
import { withModButtonViewDefault } from 'react-elegant-ui/esm/components/Button/_view/Button_view_default';
import { withModButtonViewAction } from 'react-elegant-ui/esm/components/Button/_view/Button_view_action';

// Modifiers size
import { withModButtonSizeS } from 'react-elegant-ui/esm/components/Button/_size/Button_size_s';
import { withModButtonSizeM } from 'react-elegant-ui/esm/components/Button/_size/Button_size_m';

// Some local feature
import { withModButtonSizeL } from '../_size/Button_size_l';

// Modifier width
import { withModButtonWidthMax } from 'react-elegant-ui/esm/components/Button/_width/Button_width_max';

// Export all objects from base component
export * from 'react-elegant-ui/esm/components/Button/Button@desktop';

// Build base component `DesktopButton` with specified features
// Every feature it's just HOC
export const Button = compose(
	// Make HOC with this registry
	// Every feature after this can use this registry
	withRegistry(ButtonDesktopRegistry),

	// Apply only one HOC, which will first match for props
	composeU(withModButtonViewDefault, withModButtonViewAction),
	composeU(withModButtonSizeS, withModButtonSizeM, withModButtonSizeL),

	// Apply HOC always
	withModButtonWidthMax,
)(DesktopButton);

// Set default properties for composed component
Button.defaultProps = { size: 'm', view: 'default' };

// Export new type of component with all features
export type IButtonProps = ExtractProps<typeof Button>;
```

Example of use in your project file `myApp/app.tsx`

```tsx
import { Button } from './components/Button/Button.bundle/desktop';

// ...
```

### Make your own feature

All features it's just HOCs.

Example of simply feature `myApp/components/Button/_size/Button_size_l.tsx`

```tsx
import React, { ComponentType, FC } from 'react';

// Import helper for make BEM classname and button interface
import {
	cnButton,
	IButtonProps,
} from 'react-elegant-ui/esm/components/Button/Button';

// Include styles in bundle with use feature
import './Button_size_l.css';

// Interface of feature
export interface IModButtonSizeL {
	size?: 'l';
}

export const withModButtonSizeL =
	(
		BaseComponent: ComponentType<IButtonProps>,
		// You must remove feature properties to prevent forwarding
	): FC<IModButtonSizeL & IButtonProps> =>
	({ size, ...props }) => {
		// do something if you need
		// ...

		return (
			<BaseComponent
				{...props}
				// add modifier to `className`
				className={cnButton({ size }, [props.className])}
			/>
		);
	};
```

### Smart HOC

<!-- TODO: move it to docs about compose library -->

Features may be complexity. You may use many features which trigger by one property and you may wish apply only one feature from this. For example, when you have 3 size modifier, as in example above.

For this cases, you can add to your HOC a utility property which describe apply rules.

Use for this a helper `withHOCConstructor` from library `compose`.

Example of feature `myApp/components/Button/_size/Button_size_l.tsx`

```tsx
import React, { ComponentType, FC } from 'react';

// Import helper for make BEM classname and button interface
import {
	cnButton,
	IButtonProps,
} from 'react-elegant-ui/esm/components/Button/Button';

// Use helper
import { withHOCConstructor } from 'react-elegant-ui/esm/lib/compose';

// Include styles in bundle with use feature
import './Button_size_l.css';

// Interface of feature
export interface IModButtonSizeL {
	size?: 'l';
}

export const withModButtonSizeL = withHOCConstructor<
	IModButtonSizeL,
	IButtonProps
>(
	{
		// apply this HOC only by match with this props state
		matchProps: { size: 'l' },

		// make all props names from `matchProps` is private
		// it's mean that when no one feature which use this props will not match
		// this props will auto remove
		privateMatchProps: true,
	},
	// Types will infer automatically
	// You still must remove feature properties to prevent forwarding
	(BaseComponent) =>
		({ size, ...props }) => {
			// do something if you need
			// ...

			return (
				<BaseComponent
					{...props}
					className={cnButton({ size }, [props.className])}
				/>
			);
		},
);
```

### Simply visual features

Many visual features just import styles and extends `className` property.

For this cases you can use helper `withClassnameHOC` from library `compose`.

Example of simply visual feature `myApp/components/Button/_size/Button_size_l.tsx`

```tsx
// Use helper
import { withClassnameHOC } from 'react-elegant-ui/esm/lib/compose';

// Import helper for make BEM classname
import { cnButton } from '../Button';

// Include styles in bundle with use feature
import './Button_size_l.css';

// Interface of feature
export interface IModButtonSizeL {
	size?: 'l';
}

// By match with props state will apply HOC which extend `className` property.
// This example do same as example above
export const withModButtonSizeL = withClassnameHOC<IModButtonSizeL>(
	cnButton(),
	{
		size: 'l',
	},
);
```

## Docs

For more info about development of features and components see [component development](../Component%20development/Introduction.md) docs section.

Each component directory contains `.md` files with documentation. See there if you wanna know about specific component.

For look at demo of components, you can build examples, see directory `examples`.
