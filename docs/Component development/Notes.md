# Developer notes

Notes about developing a components.

## Styles

Use CSS properties instead specific values everywhere when it possible, except specific cases like positioning with specify indents for each node.

All local CSS properties are defined in token files inside component directory, global properties define in token files in theme directory.

---

## Abstraction

Objects and interfaces should implement and extends common objects, like `IComponentElement` for example. It simplify control on many entities and decrease code complexity.

All components which use similar interfaces should be unify, make common interface and use it.

All blocks must have property `innerRef` for forwarding ref objects to block wrapper.

---

## Use root node instead document

When component use inside ShadowDOM, its root is not `document` and property `event.target` from event of `document` will contain ShadowDOM wrapper, but not real target inside this.

Consider this, and use `document` only for really global event handlers without root context, such as release mouse or button, but when need access to `event.target` - use `node.getRootNode()`, for component stay work in ShadowDOM.
