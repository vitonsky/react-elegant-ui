# Design system style guide

This style guide explain principles and methods of design system a this UI kit.

You may use this rules to modify this components and write your own components with consistent design system.

## Independence of component tokens

Each component must have own namespace in design system and own tokens in this namespace for each customizable value.

Even if value already exist in common token, component should copy this value to own token and use this token in CSS instead direct use common token in CSS.

This allows flexible customization of the component. You can change specific tokens for any component instead change one token for all components.

This way have one disadvantage in some cases - all common tokens never use in CSS and make useless traffic. It may be fix with optional removing common tokens while compile. But this also can be useful when you use CSS aliases and wanna to dynamic change values, cuz in this case you have to change only common token values.

## Cascade changes in tokens

Component tokens should not use literal values such as color or size, instead it use or modify common values.

This allows to make global changes by change common tokens.

You can use literal values for project defined tokens. It useful to personalization of design.

## Token names

Naming must be by meaning but not by value.

For example color of error message should name `error` instead `red`.

## Name structure

Token name consists of parts and present a path in structure of design system.

First part of the struct it's token namespace.
Next parts - it's just path to token key in namespace.

Example a component namespace:

- button
- icon
- menu
- textarea

To simplify navigation a tokens need group by purpose.

Typical groups:

- typo: typography tokens like size and color of text
- fillColor: background colors of block, outline, etc
- size: group for few sizes

Group may present a list of values or other groups like states list:

```yml
button:
  color:
    base:
      value: red
    hover:
      value: green
    focus:
      value: blue

  border:
    size:
      value: 2px
    style:
      value: solid
    color:
      base:
        value: red
      hover:
        value: green
```
