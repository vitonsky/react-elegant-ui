import { canUseDOM } from './canUseDOM';

export const readyStatesList = ['loading', 'interactive', 'complete'] as const;

export const readyStatesDict = { loading: 0, interactive: 1, complete: 2 };

/**
 * Run callback after specified ready state
 *
 * It useful when you need run code if page loaded or wait loading and run after
 */
export const runByReadyState = (
	callback: () => void,
	state: 'loading' | 'interactive' | 'complete' = 'complete',
) => {
	if (!canUseDOM()) return;

	if (readyStatesDict[document.readyState] >= readyStatesDict[state]) {
		callback();
		return;
	}

	const eventName = state === 'interactive' ? 'DOMContentLoaded' : 'load';
	window.addEventListener(eventName, () => callback());
};
