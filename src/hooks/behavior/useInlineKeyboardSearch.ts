import { useCallback, useEffect, useRef } from 'react';

import { findIndexLoop } from '../../lib/findIndexLoop';
import { isKeyCode, Keys } from '../../lib/keyboard';
import { useDelayCallback } from '../useDelayCallback';
import { useImmutableCallback } from '../useImmutableCallback';

/**
 * Simply object for search
 */
export interface KeyboardSearchItem {
	text?: string;
}

export type Predicate<T> = (search: string, item: T) => boolean;

/**
 * Default predicate for match text with object
 *
 * This function check property from interface `KeyboardSearchItem`, then
 * if your object is not have property `text` it will return `false` always
 */
export const defaultPredicate = <T extends KeyboardSearchItem>(
	searchText: string,
	item: T,
) => {
	const itemText = item.text;

	// Skip items which not contain text
	if (itemText === undefined) return false;

	const substr = itemText.slice(0, searchText.length);

	return substr.toLowerCase() === searchText.toLowerCase();
};

export interface KeyboardInlineSearchParameters<
	T extends KeyboardSearchItem = KeyboardSearchItem,
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
	cursor?: number;

	/**
	 * Hook to set new index of active item
	 */
	setCursor?: (index: number) => void;

	/**
	 * Predicate to check item match
	 */
	predicate?: Predicate<T>;

	/**
	 * Reset accumulated input by press escape
	 */
	resetByEsc?: boolean;

	/**
	 * Time in ms to reset accumulated input
	 *
	 * @default 500
	 */
	resetDelay?: number;

	/**
	 * Search direction. With 1 up to down, with -1 down to up
	 *
	 * @default 1
	 */
	searchDirection?: 1 | -1;

	/**
	 * Start from other end of items list when reach edge and not found nothing
	 *
	 * @default true
	 */
	loop?: boolean;

	/**
	 * Define event phase
	 *
	 * @default true
	 */
	eventCapture?: boolean;
}

/**
 * Global hook which implement inline search from keyboard
 *
 * It useful when u want fast navigate in items by input it names
 */
export const useInlineKeyboardSearch = <T>({
	enabled,
	items,
	cursor,
	setCursor,
	predicate,
	resetByEsc,
	resetDelay = 500,
	searchDirection = 1,
	loop = true,
	eventCapture = true,
}: KeyboardInlineSearchParameters<T>) => {
	const [setCallback, resetCallback] = useDelayCallback();

	// Input control
	const inputText = useRef('');

	const resetInput = useCallback(() => {
		resetCallback();
		inputText.current = '';
	}, [resetCallback, inputText]);

	const pushInput = useCallback(
		(data: string) => {
			setCallback(resetInput, resetDelay);

			inputText.current += data;
			return inputText.current;
		},
		[setCallback, resetInput, resetDelay],
	);

	const actualPredicate = predicate ?? defaultPredicate;

	// Search wrapper which iterate items and call predicate
	const findItem = useCallback(
		({
			currentCursor,
			searchText,
			checkCurrentCursor = false,
			direction = searchDirection,
		}: {
			currentCursor: number;
			searchText: string;
			checkCurrentCursor?: boolean;
			direction?: 1 | -1;
		}) => {
			// Set cursor
			let findCursor = checkCurrentCursor
				? currentCursor
				: currentCursor + direction;

			// Fix cursor
			if (findCursor >= items.length) {
				findCursor = 0;
			} else if (findCursor < 0) {
				findCursor = items.length - 1;
			}

			// Find match item
			return findIndexLoop(
				items,
				(item) => actualPredicate(searchText, item),
				findCursor,
				direction,
				loop,
			);
		},
		[searchDirection, loop, items, actualPredicate],
	);

	// Handler
	const handleInput = useImmutableCallback(
		(inputChar: string) => {
			const currentCursor = cursor ?? -1;

			let newCursor = -1;

			// Search with previous input
			const inputWithPrev = pushInput(inputChar);
			if (inputWithPrev.length > inputChar.length) {
				newCursor = findItem({
					currentCursor,
					searchText: inputWithPrev,
					// Check current item, cuz user may continue input even while match
					checkCurrentCursor: true,
				});
			}

			// Search current input
			if (newCursor === -1) {
				resetInput();

				const currentInput = pushInput(inputChar);
				newCursor = findItem({
					currentCursor,
					searchText: currentInput,
					checkCurrentCursor: false,
				});
			}

			// Fix cursor when current cursor exist but next item is not found
			// Should not reset cursor due to this, but setter should be called
			if (newCursor === -1) {
				newCursor = currentCursor;
			}

			if (setCursor !== undefined) {
				setCursor(newCursor);
			}
		},
		[cursor, setCursor, findItem, pushInput, resetInput],
	);

	// Input handler
	useEffect(() => {
		if (!enabled) return;

		const handler = (evt: KeyboardEvent) => {
			// Handle input
			if (evt.key.length === 1) {
				handleInput(evt.key);
			}
		};

		document.addEventListener('keydown', handler, {
			capture: eventCapture,
		});

		return () =>
			document.removeEventListener('keydown', handler, {
				capture: eventCapture,
			});
	}, [enabled, eventCapture, handleInput]);

	// Control handler
	useEffect(() => {
		if (!resetByEsc || !enabled) return;

		const handler = (evt: KeyboardEvent) => {
			// Reset input
			if (isKeyCode(evt.key, [Keys.ESC])) {
				evt.preventDefault();
				evt.stopPropagation();
				resetInput();
			}
		};

		document.addEventListener('keydown', handler, {
			capture: eventCapture,
		});

		return () =>
			document.removeEventListener('keydown', handler, {
				capture: eventCapture,
			});
	}, [resetByEsc, enabled, resetInput, eventCapture]);
};
