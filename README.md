# React Elegant UI

UI kit build on react with [BEM methodology](https://en.bem.info/methodology/).

Library focused on reuse, flexibility and performance, give you components and primitives for making web interfaces and your own high quality components.

## Features

- Flexibility - you can build components with only features which you really need, easy add or replace features for library components or build new component from scratch with library primitives and tools. Say no to compromise between making all from zero or use components with reach features many from which is work not as you wish or unnecessary for your use case!
- Customization - powerful design system allows you define design tokens in config files, use it in your components and easy make themes or change and redefine/override styles between projects
- Accessible - all components implement [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.2/) and accessible out of box. It's great works with keyboard and screen readers

## Getting started

Read [the docs](https://vitonsky.github.io/react-elegant-ui/docs/Introduction/GettingStarted/) to get basic usage examples.

- To start use components, read [components docs](https://vitonsky.github.io/react-elegant-ui/docs/Introduction/GettingStarted/) which explain how to use components and build components from features
- To start development your own components from scratch or make features, read [component development docs](https://vitonsky.github.io/react-elegant-ui/docs/Component%20development/Introduction/) to get known about library tools and style guide

Please, if you don't understand something, [create issue](https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2Fvitonsky%2Freact-elegant-ui%2Fissues%2Fnew) to improve documentation and make it clear.

If you can't find something in docs, try search it in source code, most likely it explain there in comments. Consider that docs will never contain all details of all features implementations, cuz world changes too fast. Aim of docs is explain concepts and details of interfaces, show examples, but not of implementations.

## Contributing

This project is real opensource and focus to community driven development.

It's mean that it make for all, but not for purposes of some company and you can join to development and suggest any ideas.

You even can make break changes which destroy back compatibility, if it make library better and you can proof this.

It's very different this project from many other libraries which make for company purposes and can't allow you do something that force them refactor their code.

This approach mean also:

- Focus on documentation. All features must be described in detail
- Code is not contains references to private resources, like inner site with docs access only for stuff accounts
- All development plans is public and discuss with community

Welcome to contribute. Please, read [CONTRIBUTING.md](CONTRIBUTING.md) and [Contributing rules](./docs/Contributing/ContributingRules.md) before.

## Support policy

As told above, this library allow breaking changes, so it may not match for "too stable" enterprise projects. But for every breaking change will make migration guide if it possible and not trivial.

Also all code and library scripts and tools try be as simple as possible and code is coveraged linters and documentation, it makes possible standalone support of any version of this library. It's good guarantees for active developed projects.

To get list of supported browsers see `.browserslistrc` file in root of repository.

Some principles:

- We don't support IE and other old browsers officially, but usually you can do it self
  - You must use your own polyfills
  - We use css variables in themes, so you must compile this to static values.
    You can use PostCSS plugins for this like [postcss-theme-fold](https://github.com/yarastqt/postcss-theme-fold)
  - If some component is not work and you can't fix it with polyfills and handling of sources, you shall rewrite only features which is not work for you and compose with other features which you want. It's very cheap for you
- Experemental features with prefixes (i.e. `UNSAFE_`, `UNSTABLE_`) may be removed in any time
- All exported objects which is not documented may be removed in any time
- Inner tools and scripts not strict obey SemVer
