This directory contains a design system files

Structure

- `tokens` token files which define variables of design system
- `themes` theme files for [themekit](https://github.com/bem/themekit) which define a used tokens
- `presets` precompiled themes. Each theme is export a `theme` object which contains modifiers for `cnTheme`

## Usage

For use theme - include css files and set theme class to root element of page or to any DOM node where need apply theme.

### Client-side only

For client-side only render you can use utility `configureRootTheme` to set global theme

```jsx
// src/App.js
import { configureRootTheme } from 'react-elegant-ui/theme';
import { theme } from 'react-elegant-ui/theme/presets/default';

import { Button } from 'react-elegant-ui/esm/components/Button/Button.bundle/desktop';

// Without specifying root element, by default it's body
configureRootTheme({ theme });

// With custom root
configureRootTheme({ theme, root: document.querySelector('#root-app') });

export const App = () => (
	<div className={cnTheme(theme)}>
		<Button>Click me</Button>
	</div>
);
```

### Common usage

Other path, suitable for server-side render, it's manually setting a `className` on DOM node.

You can use `cnTheme` to generate `className`.

```jsx
// src/App.js
import { cnTheme } from 'react-elegant-ui/theme';
import { theme } from 'react-elegant-ui/theme/presets/default';

import { Button } from 'react-elegant-ui/esm/components/Button/Button.bundle/desktop';

export const App = () => (
	<div className={cnTheme(theme)}>
		<Button>Click me</Button>
	</div>
);
```

## Unique properties names

If you need isolate a CSS properties names, you may add prefix for its while build application bundle.

Just configure your bundler to handle that all imports from this library and from your components which use this library.

You may want do it when you use css modules or if you already have CSS properties with same values.

## Fallback

For use themes [browser must support](https://caniuse.com/css-variables) CSS variables, but if you need to use UI kit for old browsers which is not support this (IE9 for example), you can compile CSS variables to static values.

For this case you can use PostCSS plugin [postcss-theme-fold](https://github.com/yarastqt/postcss-theme-fold).
