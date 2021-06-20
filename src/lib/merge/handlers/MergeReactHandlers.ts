import { MergeHandlerObject } from '../core';

import { makeChain } from '../../makeChain';

type Storage = Record<string, ((...args: any) => any)[]>;

/**
 * Merge react component handlers
 *
 * It's should be property which name start from `on[A-Z]` and be function or undefined
 */
export const MergeReactHandlers: MergeHandlerObject = {
	fn: ({ key, currentValue, value, setValue }, storage: Storage) => {
		if (
			!key.match(/^on[A-Z]/) ||
			(currentValue !== undefined &&
				typeof currentValue !== 'function') ||
			(value !== undefined && typeof value !== 'function')
		)
			return;

		// add handlers to store
		if (!(key in storage)) {
			// initialize slot in first time
			storage[key] = [currentValue, value];
		} else {
			storage[key].push(value);
		}

		// temporary set undefined
		setValue(undefined);
	},
	onEnd: (resultObj, storage: Storage) => {
		const handlers = storage;

		// Wrap all handlers to one
		Object.keys(handlers).forEach((key) => {
			// direct redifine
			resultObj[key] = makeChain(...handlers[key]);
		});
	},
};
