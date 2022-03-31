import { canUseDOM } from '../canUseDOM';
import { isIOS } from '../platform';
import * as StandartScrollLocker from './StandartScrollLocker';
import * as TouchScrollLocker from './TouchScrollLocker';

function ensureElement(element?: HTMLElement | null) {
	return element || document.body;
}

/**
 * Enable lock scroll of content on DOM node
 */
export function lock(container?: HTMLElement | null) {
	if (!canUseDOM()) {
		return;
	}

	const element = ensureElement(container);

	StandartScrollLocker.lock(element);

	if (isIOS()) {
		TouchScrollLocker.lock(element);
	}
}

/**
 * Disable lock scroll of content on DOM node
 */
export function unlock(container?: HTMLElement | null) {
	if (!canUseDOM()) {
		return;
	}

	const element = ensureElement(container);

	StandartScrollLocker.unlock(element);

	if (isIOS()) {
		TouchScrollLocker.unlock(element);
	}
}
