## Modifier rules

If you want to make new modifier or edit exists, please, obey this easy rules

- Don't mutate nodes in [effect functions](https://popper.js.org/docs/v2/modifiers/#effect)
  Purpose of effect function - prepare to execution, for example mutates in modifier storage or setup of event listeners
- Change styles and attributes only by means of popper engine, i.e. add this to special state properties instead direct applying to nodes
  This make modifiers more abstract and allow to user decide method of apply changes
- Use options for any customisible things
  Try to predict how other users will use this modifier and what they may want configure
  If you rely to some DOM node or magic value, in first try use option: `options.foo ?? bar`
