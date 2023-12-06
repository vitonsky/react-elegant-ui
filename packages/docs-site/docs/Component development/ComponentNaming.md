# Component naming and structure

Names must be clear and unambiguous. It helps you to navigate in large number of objects and simplify supporting.

When object names obey this rules, you always be understand what you use just by name and refactor be easy.

<!-- TODO: write about name and struct principles of design tokens -->

## Common principles

Names of all interfaces and exported blocks and elements should be CamelCase

### Exported interfaces should start from prefix `I`

This way make search in IDE more easy and assist to understand type of imported object and different interface from JS object.

### Name entities by meaning and not by content

For example modifier `Component_view_error` instead `Component_view_red`.

It important for independency names from values. For example, color of action button may be different in some projects and you should abstract it.

---

## Block

### Interface

Block must export interface with own props.

It needs to able create other implementation of element and interact with block from other objects.

Name pattern: `I + ComponentName + Props`

Example

- `IButtonProps`
- `ITabMenuProps`

### Component

Block must export object of type `React.ComponentType` which implement own interface.

Name pattern: `ComponentName`

Example

- `Button`
- `TabMenu`

### Feature HOC

Block features may export HOC for apply this feature on base implementation of block.

Name pattern: `with + ComponentName + FeatureName`

Example

- `withMenuDesktop`
- `withSelectDesktop`

### Class name constructor

Block must export function which construct `className` property value for elements and modifiers

Name pattern: `cn + ComponentName`

Example

- `cnButton`
- `cnTabMenu`

---

## Element

### Interface

Element must export interface with own props.

Name pattern: `I + ComponentName + ElementName`

Example

- `IButtonText`
- `ITabMenuItemText`

### Context

Element may export context object which implement own interface.

It need to simplify deep forward props.

Name pattern: `ComponentName + ElementName + Context`

Example

- `SelectTriggerContext`
- `SelectListContext`

### Component

Element must export object of type `React.ComponentType` which implement own interface.

Name pattern: `ComponentName + ElementName`

Example

- `ButtonText`
- `TabMenuItemText`

---

## Modifier

### Interface

Modifier must export interface with props which add.

Name pattern: `IMod + ComponentName + ModName`

Example

- `IModButtonViewDefault`
- `IModTabMenuViewAction`

### HOC

Modifier must export HOC for apply to block.

Name pattern: `withMod + ComponentName + ModName`

Example

- `withModButtonViewAction`
- `withModTabMenuViewDefault`

---

## Dependency injection registry

### Interface

Registry must export interface with items which it contains.

Feature specific registry (like platform registry) may extend common registry interface and add or redefine some items.

Name pattern: `I + ComponentName + FeatureName + Registry`

Example

- `IButtonRegistry`
- `ITabMenuRegistry`

Example with feature scope

- `IButtonDesktopRegistry`
- `ITabMenuExperementalIconsRegistry`

### Registry

All registries (except index files) must export registry object.

Name pattern: `ComponentName + FeatureName + Registry`

Example

- `ButtonRegistry`
- `TabMenuRegistry`

Example with feature scope

- `ButtonDesktopRegistry`
- `TabMenuExperementalIconsRegistry`

Also, registry file may export object `regObjects` which contains all dependency objects
