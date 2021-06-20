import { useEffect } from 'react';

import { findIndexLoop } from '../../lib/findIndexLoop';
import { isKeyCode, Keys } from '../../lib/keyboard';
import { useImmutableCallback } from '../useImmutableCallback';

export interface KeyboardNavigationItem {
	disabled?: boolean;
}

export type NavigationDirection = 'start' | 'end' | 'next' | 'prev';

export type Predicate<T> = (item: T) => boolean;

export const defaultPredicate = <T extends KeyboardNavigationItem>(item: T) =>
	!item.disabled;

/**
 * Return index of new active item
 *
 * If new item can't be found - return `-1`
 * It's return `-1` in case when all items except current is not match
 */
export const navigate = <T extends KeyboardNavigationItem>(
	items: readonly T[],
	cursor: number,
	direction: NavigationDirection,
	predicate?: Predicate<T>,
	loop?: boolean,
) => {
	const actualPredicate = predicate ?? defaultPredicate;
	const lastIndex = items.length - 1;

	// Init cursor
	if (cursor === -1) {
		const findDownToUp = direction === 'prev' || direction === 'end';
		const startIndex = findDownToUp ? lastIndex : 0;
		const searchDirection = findDownToUp ? -1 : 1;

		return findIndexLoop(
			items,
			actualPredicate,
			startIndex,
			searchDirection,
		);
	}

	let newCursor = -1;

	// Navigation
	if (direction === 'start') {
		newCursor = items.findIndex(actualPredicate);
	} else if (direction === 'end') {
		newCursor = findIndexLoop(items, actualPredicate, lastIndex, -1);
	} else if (direction === 'prev') {
		if (loop) {
			newCursor = findIndexLoop(
				items,
				// Skip first iteration, cuz it self object
				(item, iteration) => iteration > 0 && actualPredicate(item),
				cursor,
				-1,
			);
		} else {
			const prevItemIndex = cursor - 1;

			// Skip while out of bounds
			if (prevItemIndex < 0) {
				return -1;
			}

			// Slice array from start to previous item and search from end to start
			const offsetFromEnd = items
				.slice(0, cursor)
				.reverse()
				.findIndex(actualPredicate);

			if (offsetFromEnd !== -1) {
				newCursor = prevItemIndex - offsetFromEnd;
			}
		}
	} else if (direction === 'next') {
		if (loop) {
			newCursor = findIndexLoop(
				items,
				// Skip first iteration, cuz it self object
				(item, iteration) => iteration > 0 && actualPredicate(item),
				cursor,
				1,
			);
		} else {
			const nextItemIndex = cursor + 1;
			const foundIndex = items
				.slice(nextItemIndex)
				.findIndex(actualPredicate);
			newCursor = foundIndex === -1 ? -1 : foundIndex + nextItemIndex;
		}
	}

	return newCursor;
};

export interface KeyboardNavigationParameters<
	T extends KeyboardNavigationItem = KeyboardNavigationItem,
> {
	/**
	 * Handlers work only when enabled
	 */
	enabled: boolean;

	/**
	 * List of items for navigate
	 */
	items: T[];

	/**
	 * Index of active item from list
	 */
	cursor: number;

	/**
	 * Hook to set new index of active item
	 */
	setCursor?: (index: number) => void;

	/**
	 * Predicate to check item match
	 */
	predicate?: Predicate<T>;

	/**
	 * Define handled arrow keys
	 */
	direction?: ('vertical' | 'horizontal')[];

	/**
	 * Start from other end by reaching the edge
	 */
	loop?: boolean;

	/**
	 * Enable jumps to start or end of items list
	 */
	enableJump?: boolean;

	/**
	 * Define event phase
	 *
	 * @default true
	 */
	eventCapture?: boolean;
}

/**
 * Global hook which implement keyboard navigation
 *
 * It useful when u want navigate in items by keyboard arrows
 */
export const useKeyboardNavigation = <T>({
	enabled,
	items,
	cursor,
	setCursor,
	predicate,
	direction,
	loop,
	enableJump,
	eventCapture = true,
}: KeyboardNavigationParameters<T>) => {
	// Update global handler
	const onKeyDownGlobal = useImmutableCallback(
		(evt: KeyboardEvent) => {
			if (direction === undefined) return;

			const cursorIndex = cursor ?? -1;

			let navDirection: NavigationDirection | null = null;

			// Set navigation direction
			if (enableJump && isKeyCode(evt.code, [Keys.HOME, Keys.END])) {
				navDirection = evt.code === Keys.HOME ? 'start' : 'end';
			} else if (
				direction.indexOf('vertical') !== -1 &&
				isKeyCode(evt.code, [Keys.UP, Keys.DOWN])
			) {
				navDirection = evt.code === Keys.UP ? 'prev' : 'next';
			} else if (
				direction.indexOf('horizontal') !== -1 &&
				isKeyCode(evt.code, [Keys.LEFT, Keys.RIGHT])
			) {
				navDirection = evt.code === Keys.LEFT ? 'prev' : 'next';
			}

			// Skip handle a non navigation keys
			if (navDirection === null) return;

			evt.preventDefault();

			let newCursor = navigate(
				items,
				cursorIndex,
				navDirection,
				predicate,
				loop,
			);

			// Fix cursor when current cursor exist but next item is not found
			// Should not reset cursor due to this, but setter should be called
			if (cursorIndex !== -1 && newCursor === -1) {
				newCursor = cursorIndex;
			}

			// Set cursor
			if (setCursor !== undefined) {
				setCursor(newCursor);
			}
		},
		[items, cursor, setCursor, predicate, direction, loop, enableJump],
	);

	// Global handler
	useEffect(() => {
		if (!enabled) return;

		document.addEventListener('keydown', onKeyDownGlobal, {
			capture: eventCapture,
		});

		return () =>
			document.removeEventListener('keydown', onKeyDownGlobal, {
				capture: eventCapture,
			});
	}, [enabled, onKeyDownGlobal, eventCapture]);
};
