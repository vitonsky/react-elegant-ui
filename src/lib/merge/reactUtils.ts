import { configure } from './core';
import { MergeReactClassnames } from './handlers/MergeReactClassnames';
import { MergeReactHandlers } from './handlers/MergeReactHandlers';
import { Redefine } from './handlers/Redefine';

/**
 * Merge react props
 */
export const mergeProps = configure({
	handlers: [MergeReactClassnames, MergeReactHandlers, Redefine],
});

/**
 * Merge react props in dictionary
 *
 * It useful when you have object which contains objects with props,
 * for example if you use context with props to some components
 */
export const mergePropsInDictionary = configure({
	handlers: [
		({ currentValue, value, setValue }) => {
			if (
				(currentValue !== undefined &&
					typeof currentValue !== 'object') ||
				(value !== undefined && typeof value !== 'object')
			) {
				return;
			}

			setValue(mergeProps(currentValue, value));
		},
		Redefine,
	],
});
