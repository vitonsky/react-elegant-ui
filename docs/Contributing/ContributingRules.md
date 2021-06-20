# Contributing rules

If you find bug or you have good ideas, please make issue on Github.

Before do it, you should check exists issues, maybe your idea/bug already exist.

## PR rules

You can make pull request (PR), but if your PR have big changes, in first you should discuss it in issues, because maybe we already fix it or planned work on it.

Before making PR, check exists PRs, maybe it already resolved.

Before send your changes you must read `CONTRIBUTING.md` in root directory of repository and accept rules.

Common rules:

- Write in detail about your work in PR description with examples if it possible
- Your PR should change only one thing and shouldn't affect to other exists library components
- Follow the [component development rules](../Component%20development/Introduction.md) while write code
- Comment your code. It help for all to understand and maintain your code

  This is especially important for hacks and unobvious code

- Use readable names for variables, functions, classes, etc.
- Follow the commit rules bellow

Your changes also must follow next rules

### Scope of usage

Your contributions in this repo must be for common usage, for many cases.

For example, PR with change color of button will reject, cuz users can change color in their projects, it not required changes on library level.

We can't add features for all cases at least because every feature require maintain.

If we can't accept your changes due to not common scope, please, don't be upset and make library that have this library as peer dependency and implement your feature there. It will good for all and you can collect features for your scope in your own library.

Scoped addons can be useful for you and other people, but not make maintain of this library harder. You can tag us in npm and make issue with description of your addon package and we tell about it.

### Breaking changes

Before write code with breaking changes you must make issue for discuss this.

We can accept that changes, but only if you can proof that it useful changes which improve library.

If you want make changes that break many things, it's not problem, but please, write detail migration guide before this for we can estimate cost of this changes and find good time for accept.

### New features

When you want to add new features to exists components, you must not change this components.

Instead this just add wrapper or alternative implementation of object which implement interface of original.

### Unify

If you can't extend exists object and you sure that it can be unify, you can make issue for discuss this changes and if we decide that this changes is required for common usage, then changes will accept and you can implement your feature.

When you find problems with unify of interfaces or implementations of components and make issue about it, you very help to unify components.

Some components can't be unify for all cases, but we must seek to it and keep balance between unify and size of implementation. Cuz when user can't use implementation for own features, user will make own implementation and this should be easy for him.

## Commit rules

Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) rules.

The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]
```

Commit types

- fix
- feat
- test
- refactor
- docs
- chore
