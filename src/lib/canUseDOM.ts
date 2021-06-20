// Imported from yandex-ui. Source: https://github.com/bem/yandex-ui/

/**
 * Check available of browser API in current environment
 *
 * @example
 * if (canUseDOM()) {
 *   document.querySelector('...')
 * }
 */
export const canUseDOM = (): boolean => {
	return (
		typeof window !== 'undefined' &&
		typeof window.document !== 'undefined' &&
		typeof window.document.createElement !== 'undefined'
	);
};
