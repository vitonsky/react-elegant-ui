# Component anatomy

Component it's essence which implement a some functional of user interface.

For flexibility purposes components split to many modules and have high abstraction.

This architecture allows build components only with necessary features and very easy implement addon features for exists modules or replace modules.

Each essence must have interface which it implement. Interface is primary

## Structure and bundles

Components developed by [BEM methodology](https://en.bem.info/methodology/) and split to Block, Elements and Modifiers.
To use component, you have to build it with necessary features (Block, Elements and Modifiers).

That builds named a "bundles" and by default each component have at least 1 bundle with all features (except some very simply helper components).

You can use it for test components, but for production you should build your own bundles to decrease application bundle size and maybe use your own features.

### Block

Block it's main part of component which contains a must common logic

### Elements

Elements it's components exists only inside block

### Modifiers

Modifiers it's HOCs that define optional functional of block

## Design tokens

Design tokens contains a colors, sizes, typography and other values of component styles.

Component define a [design tokens](./Tokens.md) which compile to CSS properties that is use in styles of component.

This allows flexible redefine token values and reuse common values like project color or font size.

When you make your own elements, you can use exists or define new tokens.

## Dependency registries

To decrease code dependency, objects must don't use other objects directly.

For example, while make Block extension which add features to basic block, we must make HOC for basic block and wrap basic block instead make component which use basic block inside.

This way allow apply this extension to other implementation of basic block.

But, when you need component inside other component, you can use dependency registry.

You just use provider to get object by name and still can set any object outside of component.

## Assets

Component may contains some resources such as icons, fonts or shared code. It should be place in directories with clear names. For example `ComponentName.hocs`, `ComponentName.assets`.

Third-party assets must contains license texts and links to sources.
