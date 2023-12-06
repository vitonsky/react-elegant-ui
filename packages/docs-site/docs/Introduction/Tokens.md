# Design tokens

Any component can be implement many ways and to abstract from details you must use design tokens.

For example you make button and you need inner indents. You may use padding, but someone other may want use margin.

You can use design tokens to define parameters of button indents and allow to different implementations use this values as its want.

## Principles

Design tokens it's just some abstract dictionary with names and values which define view of components.

This UI kit use [YAML files](https://en.wikipedia.org/wiki/YAML) to define design tokens in [style-dictionary](https://github.com/amzn/style-dictionary) format. This format allows reference to other tokens and use functions for handle values, for example change brightness of color or convert units.

All tokens define in files with extension `.tokens.yml`.

Each component contains files with own tokens.

Directory `tokens` contains a common tokens which use in components.

Tokens must use namespaces.

- For components it their names
- For common tokens it their domain of usage

## Usage

Tokens may convert to any format such as CSS custom properties, XML, JSON, JS, etc.

For compile themes from tokens use theme library.

## Example

Typical example of design tokens file

```yml
button:
  # Define transitions speed
  transition:
    press:
      value: '250ms'
    hover:
      value: '{transition.controls.action.hover.size.s.in.value}'

  border:
    width:
      value: '{typography.controls.border.width.s.value}'
    # Make square button
    radius:
      value: '0'

  # Define style for action button with view `action`
  viewAction:
    fillColor:
      base:
        value: '#ffd11a'
      hovered:
        value: '#ff6464'
      disabled:
        value: '#ffe991'

    typoColor:
      base:
        value: '#000'
```
