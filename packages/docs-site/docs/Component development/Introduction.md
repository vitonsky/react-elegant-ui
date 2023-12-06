<!-- TODO: split by headers -->

# Component development

Here explain how to write good components, easy for maintenance.

---

# Common recomendation

## Use strict typing

Components written on typescript because strict types simplify maintenance.

When you wrong - you just can't compile code and in many cases you even don't need to check types in runtime, because successful compilation guarantee you many things.

But guarantees require high quality code with types which reflect domain specific.

Therefore you must write real types and try avoid `any` type, type casting and other hacks.

Typescript is very flexible language and allow you make complexity types. Usually TS features enought for any case. If you can't express something, check [typescript docs](https://www.typescriptlang.org/docs/) or make issue to discuss your problem.

## Write stupid code

Maintain complexity is very important parameter of code, it's literally define future of code base.

Code complexity and its diversity is a key factors of code base hard for maintenance.

The simply stupid code the better. Under stupid mean its clear and simplicity.

We can use linters and tools which control codestyle, but we can't prevent all cases with complexity code, especially since sometime we have to write complexity code for performance purposes.

Please, don't write beautiful and smart code which require time to understand.

Your code must be simple, obviously and monosemantic. What would people read it and don't think what means your construction.

For example, `x === -1` better than `!~x`, because we shouldn't parse syntax and build logical pipeline with negation of negation, follow the logic and other things. We just see statement and understand it instantly.

Your code is nothing and will replace in any time. At least because tomorrow it will be deprecated. Keep it in mind when write code and focus on functionality and clearly. Functional will keep forever.

## Comment all

If you have to write not trivial code or use hack, explain it.

When you make public essence such as function, class or other object, add doc block for it.

When you change a exists public essence and it change behavior or signature, update description of it.

If you not wanna do something right now, but see that it needful or would be usefull, make TODO comment with explain of it.

If you don't sure about something, comment it and say about. It's fine, someone later improve it, maybe you or not.

If you see suboptimal things, make TODO comment with tag #perf and explain problems. Criticism to code it's fine and help to make code better. But please, explain points, but not just insult a code because it useless information.

## Specify licenses and authors for thirdparty resources

We respect authors of thirdparty resources and require specify license and authors for any thirdparty resources. Not matter what is it. It may be icons, fonts, images, libraries, parts of code or other. You must add this information for any resource and resource license must allow use resource anywhere.

Remember that you are responsible for check licenses and author rights. If you find resource on some random site and there say that this resource is free to use anywhere it's mean nothing. You must reference to source of each resource and this must contains license agreement.

This is to ensure fair usage.

---

# Components development principles

For info about development components see [component naming and structure](./ComponentNaming.md).

More info about components in [component anatomy](../Introduction/ComponentArchitecture.md) and [component file structure](../Introduction/ComponentFileStructure.md).

If you still don't, must read [BEM methodology](https://en.bem.info/methodology/) to understand terms and architecture of components.

## Blocks

For control a class names of components use library [@bem-react/classname](https://github.com/bem/bem-react/tree/master/packages/classname), make cn object in basic implementation of component and use it in other essences.

### Minimal implementation

Block it's root of component and should implement minimal common features of component.

If you want implement feature which will use only on desktop, such as keyboard navigation, do it in feature file with feature name postfix in name, for example `Button@desktop.tsx`, `Button@touch.tsx`, `Button@someExperementName.tsx`.

## Elements

Move all elements to separate components, even if it very simply block.

It need to user can replace element to other implementation.

## Modifiers

Modifiers should be a High Order Components (HOC).

Modifiers should self remove all own props which not declared in basic block interface and don't forward it.

<!-- TODO: write docs for "compose" library and add link here -->

You can use compose library to define HOCs which will apply by match props values and auto remove own properties when not match.

---

# Reuse

## Keep state outside

Keep state outside and make requests to change state inside.

If don't do it, component will keep private state and wrappers can't control component and component stay unextendable.

You can keep inside a state which specific only for this entity, but all public properties states must keep outside.

## Split to features

Component can't have features for any case, because number of cases is infinity.

Instead this component should be designed extensible and implement only basic features.

All other may be implement as wrappers which add features.

This design allows add features for any case.

Default implementation of some feature in library don't like for you? It's fine, you don't need to fork library, replace some details in this implementation and support it self, just replace feature to your own implementation and it all. You can copy code of default implementation, replace details and use as your own feature which work as you wish.

If basic block layout bad for your case, just use your own implementation, you need only replace it with compose.

## Use wrappers

When you implement block feature, you need block to wrap it. But you must not direct use block inside implementation. It make feature not applyable for other block implementation.

Instead this make HOC for block, export it, apply to block and export wrapped block.

This way allow to user apply this feature to any block which implement interface of basic block.

## Move common logic outside

Some UI logic need in many components. When you catch this, just move this logic to library, unify it and use library in same cases.

Better if you make library which not bind to framework and then adopt it to this, for example make behavior hook. This way allow you collect behavior logic and use it indepedent of framework features and even indepedent of framework, for example in pure JS.

Good example of this it is [popperjs](https://popper.js.org) which can be use in pure js, react or any other library.

## Use common interfaces

<!-- TODO: write docs for common interfaces and add link here -->

When interface have typical properties, use extends the coommon interfaces like `IComponentElement`

This unify properties and simplify global refactoring, because you can refactor only one interface and changes will apply to all implementations

## Make extenson nodes

When you build component think about how users may want extend this.

To extend component often need add child nodes, then add props which give component and render in some place inside.

You can use names start from `addon`: `addonBefore`, `addonAfter`, `addonBeforeControl`, `addonAfrerWrapper`

## Forward all

When you make wrapper, probably you insert to basic element some props.

Don't forget forward user props with same names. You should make mix from your value and user value.

If it class name join it, if it callback, make call chain from your and user callback, if it context, mix context values but don't lose user values.

## Class component vs functional

You can make components of any type, class components, functional components or both.

But functional components have hooks and very convenient move common ligic to hooks and use it everywhere.

Also, functional components is simply, so this library use mostly functional components.

But you can mix this.

---

# Abstract components and replaceable

- [Use design tokens](../Introduction/Tokens.md)

## Component incapsulation and autonomy

Component it's standalone entity and must be indepedent from all other.

It mean that component must contain all self parts such as code, styles, design tokens, docs, and other resources.

Component must consist from parts which can be replace to other implementations and end features can be define only while make bundle.

## Use contexts to props forwarding

Components may use many wrappers and to forward props to some element you should use contexts.

Just make context contains props while make element and use it inside. And when you need to set props on element, use context provider for it.

## Use DI

<!-- TODO: write docs about DI library and principles -->

When you need some object, like element, you shall not use it directly never.

Instead this use dependency injection containers.

It allows you replace objects while composing.

Don't make types for DI which have all possible objects. Instead make type for basic components and standalone types for each feature and union this types while make bundle.

This way allows to users set only necessary objects in their registry.

See more info in [DI library docs](https://github.com/bem/bem-react/tree/master/packages/di)
