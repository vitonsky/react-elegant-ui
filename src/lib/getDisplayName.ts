import { ComponentType } from 'react';

/**
 * Return name of react component.
 */
export function getDisplayName<T>(component: ComponentType<T>) {
	return component.displayName || component.name || 'Component';
}
