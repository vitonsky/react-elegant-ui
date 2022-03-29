import { getScrollBarGap, isRootHTMLElement, setStyle } from './utils';

interface ScrollLockState {
	initialStyle: Partial<CSSStyleDeclaration>;
	count: number;
}

const locksRegistry = new Map<HTMLElement, ScrollLockState>();

function getLockState(node: HTMLElement) {
	return locksRegistry.get(node);
}

function setLockState(node: HTMLElement, state: ScrollLockState) {
	locksRegistry.set(node, state);
}

function clearLockState(node: HTMLElement) {
	locksRegistry.delete(node);
}

function hasStaticVerticalScroll(node: HTMLElement) {
	const { overflowY } = getComputedStyle(node);

	return /scroll/.test(overflowY);
}

function getScrollbarSize(node: HTMLElement) {
	const hasScrollbarRoot =
		isRootHTMLElement(node) &&
		window.innerWidth - document.documentElement.clientWidth > 0;
	const hasScrollbarNode = node.scrollHeight > node.clientHeight;

	if (hasScrollbarRoot || hasScrollbarNode || hasStaticVerticalScroll(node)) {
		return getScrollBarGap();
	}

	return 0;
}

/**
 * Lock will add padding to container instead of scroll to avoid blinking
 */
export function lock(container: HTMLElement) {
	const state = getLockState(container);

	if (state) {
		state.count++;
		return;
	}

	const scrollBarSize = getScrollbarSize(container);
	const computedPaddingRight = parseInt(
		getComputedStyle(container).getPropertyValue('padding-right'),
		10,
	);

	// NOTE: styles may be broken in future while unlocking if it will changed while locking
	// so probably we should observe changes and rewrite it to return actual values by unlocking
	const initialStyle = setStyle(container, {
		paddingRight: `${computedPaddingRight + scrollBarSize}px`,
		overflow: 'hidden',
		overflowX: 'hidden',
		overflowY: 'hidden',
	});

	setLockState(container, { initialStyle, count: 1 });
}

export function unlock(container: HTMLElement) {
	const state = getLockState(container);

	if (!state) {
		return;
	}

	state.count--;

	if (state.count === 0) {
		setStyle(container, state.initialStyle);
		clearLockState(container);
	}
}
