<!-- TODO: move to Tools dir after write there about all tools of library -->

# Package structure

Package split to few parts - tools for make components and components made with this tools.

Almost all essences (functions, classes, types and other objects) in library is exported, but you should use only essences which have documentation, because all other may be removed in any time without notifications.

Stable components at least have `README.md` file or have page in docs.

With time components will unify and stabilize and add to docs.

If you can't find something in docs, try to search it in source code, most likely it explain there in comments. Consider that docs will never contain all details of all features implementations, cuz world changes too fast. Aim of docs is explain concepts and details of interfaces, show examples, but not of implementations.

Below explaining structure of package.

## Components

Directory `components` contains a component directories with all them files.
Sub-directories named by component names, for example `Button`, `Menu`, `Select`.

For more info see [component anatomy](./ComponentArchitecture.md) and [component file structure](./ComponentFileStructure.md).

## Hooks

<!-- TODO: make docs for exists hooks with explain API -->

Directory `hooks` contains a [react hooks](https://ru.reactjs.org/docs/hooks-reference.html) useful for development UI components.

Subdirectory `behavior` contains a react hooks which implement typical behavior of UI components.

It very useful and allow share common logic of components. When you make some not trivial logic, check this first, maybe this already implemented as behavior hook. If not, but logic which you implement very common and may reuse for other components, make issue with explain to move this logic in hook.

## HOCs

Directory `hoks` contains collection of utility high order components.

## Libraries

<!-- TODO: make docs for exists libs with explain API -->

Directory `lib` contains useful libraries.

## Theme

Directory `theme` contains a common design tokens and themes for standard library components.

## Polyfills

Directory `polyfills` contains a browser-specific libraries.

## Types

Directory `types` contains a library TypeScript types.

## CJS/ES modules

Package contains CJS and ES modules, for use ES modules, add prefix `/esm` in path to component

Example of import default bundle a Button component as ES module

```JS
import { Button } from 'react-elegant-ui/esm/components/Button/Button.bundle/desktop';
```

You may need CJS modules for server side rendering, but use ES modules for build tools (WebPack, Rollup, etc.), because ESM is supporting [tree shaking](https://en.wikipedia.org/wiki/Tree_shaking).
