# Component file structure

<!-- TODO: update examples  -->

Component directories follow by [BEM file structure organization](https://en.bem.info/methodology/filestructure/) and contains all files of component.

Below presented typical file structure of components, in fact a block may have not some components or have unlisted here components, for clarification see to docs for specific component.

## File structure

- `ComponentName.tsx` - basic component (block)
- `__examples__` - directory with examples a usage of components
- `ComponentName@platform.tsx` - basic platform-specific version of component that extends a basic component
- `_modName` - directory of boolean modifier with name `modName`
  - `ComponentName_modName.css` - styles of mod
  - `ComponentName_modName.tsx` - declaration of mod
- `_otherModName` - directory of key-value modifier with name `otherModName`
  - `ComponentName_otherModName_value1.css` - styles of mod with value `value1`
  - `ComponentName_otherModName_value1.tsx` - declaration of mod with value `value1`
  - `ComponentName_otherModName_value2.css` - styles of mod with value `value2`
  - `ComponentName_otherModName_value2.tsx` - declaration of mod with value `value2`
- `ElementName` - directory of element with name `ElementName`
  - `_modName` - directory of boolean modifier with name `modName` for element `ElementName`
    - `ElementName_modName.css` - styles of mod
    - `ElementName_modName.tsx` - declaration of mod
  - `ElementName.css` - styles of element
  - `ElementName.tsx` - declaration of element
- `ComponentName.assets` - directory with resources of components, such as images, fonts, etc.
- `ComponentName.bundle` - directory with composed components with all features, named by pattern `platform.tsx`
  - `platform.ts` - contains composed component for a specific platform
- `ComponentName.docs` - directory with additional docs
- `ComponentName.hocs` - directory with High Order Components for this block
- `ComponentName.registry` - directory for DI files
  - `index.ts` - contains only registry interface, without implementation
  - `platform.ts` - contains registry object for a specific platform
- `ComponentName.tests` - directory with tests of component
- `ComponentName.tokens` - directory with design tokens for component

Under `platform.tsx` meaning name for specific platform, for example `desktop.tsx`, `mobile.tsx` or `touch.tsx`.

Here displays file structure examples of source, therefore used `.ts` and `.tsx` files, but package contains compiled `.js` files with `.d.ts` headers.
