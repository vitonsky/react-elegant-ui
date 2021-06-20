Library for make and compose high order components.

## Why?

This library help to define a HOCs with typical behavior, like exclude a properties of non-matched HOCs
or enable HOCs by match props values, but exclude this props.

This give you control under HOCs and simplify usage of it, especial when you have many HOCs.

## How it work?

When you make HOC with hepler function, you make wrapper with utility properties for your HOC.

When you use compose functions, it consider utility properties of HOCs (if exists) and handle it.

In one compose you can use HOCs and ordinary HOCs, who is not have utility props.

You can use HOC objects as ordinary HOCs, cuz it just functional component, but then logic of applying will not work.

## Should i use this everywhere?

As you wish. If you have really many HOCs and a helpers decrease your performance,
then report about it and try use manual control, i.e. make HOC for manage other HOCs props.

If you need, you can make your own composers, who will implement a handling of HOCs.

But i don't sure that it can affect to performance even with hundreds HOCs,
because if you feel to this affects, why you use react?

## Usage

You can make HOCs which will apply by condition

```JSX
// Create HOC
const withPressable = withHOCConstructor(
	{
		// object with required state of props
		matchProps: { pressable: true },
		// list names of props which will removed if HOC will not match
		privateProps: ['pressable'],
	},
	(Component) => ({pressable, ...props}) => {
		// message will write each render of this component when property `pressable` is true
		console.log('I render pressable component', Component);

		return <Component {...props} />;
	}
);

// Apply HOC
import {Button as BaseButton} from './Button';

const Button = compose(withPressable)(BaseButton);

<Button>Press me</Button>
```

While composing you can define switch to apply one of many HOCs by conditions.
Only first matched HOC from group will apply

```JSX
// Create HOC 1
const withColorRed = withHOCConstructor(
	{
		matchProps: { color: 'red' },
		privateProps: ['color'],
	},
	(Component) => ({color, ...props}) => {
		// message will write each render of this component when property `color` is 'red'
		console.log('My color is', color);

		return <Component {...props} />;
	}
);

// Create HOC 2
const withColorYellow = withHOCConstructor(
	{
		matchProps: { color: 'yellow' },
		privateProps: ['color'],
	},
	(Component) => ({color, ...props}) => {
		// message will write each render of this component when property `color` is 'yellow'
		console.log('My color is', color);

		return <Component {...props} />;
	}
);

// Create HOC 3
const withNoColor = withHOCConstructor(
	{
		matchProps: { noColor: true },
		privateProps: ['noColor'],
	},
	(Component) => ({color, ...props}) => {
		// message will write each render of this component when property `matchProps` is true
		console.log("I have no color and it's was define directly");

		return <Component {...props} />;
	}
);

// Apply HOCs
import {Button as BaseButton} from './Button';

const Button = compose(
	// Group of HOCs which apply only first matched HOC
	composeU(withNoColor, withColorRed, withColorYellow),
	// HOC from example above
	withPressable
)(BaseButton);

<Button>Press me</Button>
```
