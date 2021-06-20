export type KeyboardKeys = string;

export type Keys = Record<KeyboardKeys, string | string[]>;

export type KeyCodesList = readonly (KeyboardKeys | readonly KeyboardKeys[])[];

/**
 * Dictionary contains popular key codes
 *
 * It should use with `code` property with native event,
 * but usually it will work with `key` property of react synthetic event
 */
export const Keys = {
	// Control
	ENTER: ['Enter', 'NumpadEnter'],
	SPACE: 'Space',
	ESC: 'Escape',

	// Navigation
	TAB: 'Tab',
	UP: 'ArrowUp',
	DOWN: 'ArrowDown',
	LEFT: 'ArrowLeft',
	RIGHT: 'ArrowRight',
	HOME: 'Home',
	END: 'End',
	PAGE_UP: 'PageUp',
	PAGE_DOWN: 'PageDown',

	// Other
	CAPS_LOCK: 'CapsLock',
} as const;

/**
 * Check key code to match
 *
 * It useful to abstract from real key codes and replace it to constants
 *
 * @example
 * isKeyCode(event.code, [Keys.ESC, Keys.ENTER])
 *
 * @param code Key code.
 * @param keys List of keys as numbers or strings.
 */
export function isKeyCode(
	code: string,
	keys: KeyCodesList | KeyboardKeys,
): boolean {
	return Array.isArray(keys)
		? keys.some((value) => isKeyCode(code, value))
		: keys === code;
}
