import { Nullable } from '../../types/utility-types';
import { canUseDOM } from '../../lib/canUseDOM';

import { ThemeWhitepaper } from '../types';
import { cnTheme } from '..';

type ConfigureRootThemeOptions = {
	/**
	 * Theme to apply
	 */
	theme?: ThemeWhitepaper | Record<string, string>;

	/**
	 * DOM element for apply theme
	 *
	 * @default HTMLBodyElement
	 */
	root?: Nullable<Element>;
};

let prevClassName = '';

/**
 * Helper to set theme to root node. This theme will be global
 */
export const configureRootTheme = ({
	theme,
	root = canUseDOM() ? document.body : null,
}: ConfigureRootThemeOptions) => {
	if (!canUseDOM()) {
		return;
	}

	if (!root) {
		throw new Error(
			`Property "root" is not DOM element. Can't set global theme.`,
		);
	}

	// Remove old className to prevent duplicates with repeated call
	const rootClassName = root.className.replace(prevClassName, '');

	prevClassName = cnTheme(theme ?? {});

	root.className = `${rootClassName} ${prevClassName}`;
};
