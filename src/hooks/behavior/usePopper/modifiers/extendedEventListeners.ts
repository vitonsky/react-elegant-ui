import { Modifier, ModifierArguments, State } from '@popperjs/core';

export type Options = {
	transitions?: boolean;
	animations?: boolean;
	loadingStages?: DocumentReadyState[];
	elements?: Array<keyof State['elements']>;
};

const loadingStageIndex = {
	loading: 0,
	interactive: 1,
	complete: 2,
};

const loadingStageEventsMap = {
	interactive: 'DOMContentLoaded',
	complete: 'load',
};

const effect = ({ state, instance, options }: ModifierArguments<Options>) => {
	const {
		transitions = true,
		animations = true,
		loadingStages = ['complete'],
		elements = ['reference'],
	} = options;

	const updateFn = () => instance.update();

	// Update by loading stages
	const GlobalEvents = loadingStages.reduce((acc, stage) => {
		// Skip stages lower that current or equal
		if (
			loadingStageIndex[document.readyState] >= loadingStageIndex[stage]
		) {
			return acc;
		}

		const evtName = (loadingStageEventsMap as any)[stage];
		if (evtName) {
			acc.push(evtName);
		}

		return acc;
	}, [] as (keyof DocumentEventMap)[]);

	GlobalEvents.forEach((evtName) =>
		document.addEventListener(evtName, updateFn),
	);

	// Transitions & animations
	const observeNodes = elements.reduce((acc, name) => {
		const node = state.elements[name];
		if (node instanceof HTMLElement) {
			acc.push(node);
		}
		return acc;
	}, [] as HTMLElement[]);

	if (transitions) {
		observeNodes.forEach((element) =>
			element.addEventListener('transitionend', updateFn),
		);
	}

	if (animations) {
		observeNodes.forEach((element) =>
			element.addEventListener('animationend', updateFn),
		);
	}

	// Cleanup
	return () => {
		GlobalEvents.forEach((evtName) =>
			document.removeEventListener(evtName, updateFn),
		);

		if (transitions) {
			observeNodes.forEach((element) =>
				element.removeEventListener('transitionend', updateFn),
			);
		}

		if (animations) {
			observeNodes.forEach((element) =>
				element.removeEventListener('animationend', updateFn),
			);
		}
	};
};

/**
 * Extended event listeners which update state by loading page
 * and by end of transitions or animations
 */
export const extendedEventListeners: Modifier<
	'extendedEventListeners',
	Options
> = {
	name: 'extendedEventListeners',
	enabled: true,
	phase: 'main',
	fn: () => {},
	effect,
};
