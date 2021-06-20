import { createContext, useContext, useRef } from 'react';

export type UIDContextValue = {
	/**
	 * Context identifying name
	 */
	id: string;

	/**
	 * Current id
	 */
	counter: number;
};

export const initialContextValue: UIDContextValue = {
	id: 'default',
	counter: 0,
};

/**
 * Property `counter` will be mutable
 */
export const UIDContext = createContext<UIDContextValue>(initialContextValue);

/**
 * Generate unique id
 *
 * You can use context `UIDContext` to set generator state
 *
 * @example
 * const id = useUniqId()
 */
export function useUniqueId(prefix: string = 'uid'): string {
	const context = useContext(UIDContext);
	const id = useRef<string | null>(null);

	if (id.current === null) {
		id.current = [prefix, context.id, ++context.counter].join('-');
	}

	return id.current;
}
