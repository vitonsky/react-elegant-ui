// Imported from yandex-ui. Source: https://github.com/bem/yandex-ui/

import { CSSProperties } from 'react';
import { Modifier, ModifierArguments } from '@popperjs/core';

/**
 * Apply styles and attributes right on DOM elements to improve performance
 */
function applyStylesFn({ state }: ModifierArguments<{}>) {
	Object.keys(state.elements).forEach((name) => {
		const style = state.styles[name] || {};
		const attributes = state.attributes[name] || {};
		// @ts-ignore use name as key to elements
		const element = state.elements[name];

		if (!(element instanceof HTMLElement)) {
			return;
		}

		Object.assign(element.style, style);

		Object.keys(attributes).forEach((name) => {
			const value = attributes[name];
			if (value === false) {
				element.removeAttribute(name);
			} else {
				element.setAttribute(name, value === true ? '' : value);
			}
		});
	});
}

/**
 * Not use `applyStyles` from popper, cuz there effect will cleanup,
 * but we need save position for animate
 */
function applyStylesEffect({ state }: ModifierArguments<{}>) {
	const initialPopperStyles: CSSProperties = {
		position: state.options.strategy,
		left: 0,
		top: 0,
		margin: 0,
	};

	Object.assign(state.elements.popper.style, initialPopperStyles);
}

/**
 * Modifier to apply styles right on DOM elements while change position
 *
 * This modifier may be faster than `updateStyles` cuz don't trigger render,
 * but it not idiomatic for react and it make execution flow inconsistent
 */
export const applyStyles: Modifier<'applyStyles', {}> = {
	name: 'applyStyles',
	enabled: true,
	fn: applyStylesFn,
	effect: applyStylesEffect,
	phase: 'write',
	requires: ['computeStyles'],
};
