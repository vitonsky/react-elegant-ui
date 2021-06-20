Hooks that implements behavior which often use in components

This hooks is not define state of component, cuz it must do users of component,
but this hooks implements typical common logic which can be reused.

Key idea that component must be stupid and don't define public state inside.

Compliance with this rule give you full control on state of component outside.

Ofcourse hooks can have inside state, but it must not affect to public state from props.

Instead this, hooks can use user defined setters to request new state.
