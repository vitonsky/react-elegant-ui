# Theming

Component styles use a global [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) which contains colors, fonts, sizes, etc.

```css
/* Example styles of modifier `view` */
.Button_view_action {
	color: var(--button-view-action-typo-color-base);
}

.Button_view_action:hover {
	color: var(--button-view-action-typo-color-hovered);
}

.Button_view_action::before {
	background-color: var(--button-view-action-fill-color-base);
}

.Button_view_action:hover::before {
	background-color: var(--button-view-action-fill-color-hovered);
}
```

This properties generate from [design tokens](./Tokens.md) and group to CSS classes.

That classes is a themes. Themes class names follow the BEM methodology.

```css
/*
* Example of scoped theme which contains only colors, you may use theme
* without scope `.Theme_default` with all values types if you wish
*/
.Theme_color_default {
	--button-view-action-typo-color-base: #fff;
	--button-view-action-typo-color-hovered: #fff;
	--button-view-action-fill-color-base: #0366d6;
	--button-view-action-fill-color-hovered: rgb(9, 122, 251);
}
```

Actually, properties may be group to any CSS entity, but this library use only classes.

This architecture allow redefine views of components for each DOM node just by set theme on this node.

A theme can contain any properties, both all properties of all components, and only colors or typography and other. You can mix themes to split use of colors and sizes.

## Fallback

For use themes [browser must support](https://caniuse.com/css-variables) CSS variables, but if you need to use UI kit for old browsers which is not support this (IE9 for example), you can compile CSS variables to static values.

For this case you can use PostCSS plugin [postcss-theme-fold](https://github.com/yarastqt/postcss-theme-fold).

## Tools

You can use any tools to convert design tokens to themes such as design tokens it's just [YAML files](https://en.wikipedia.org/wiki/YAML).

Actually design tokens use references to other tokens and functions for transform values, but it not too hard to implement.

This package is use a [themekit](https://github.com/bem/themekit) tool which based on [style-dictionary](https://github.com/amzn/style-dictionary).
