import React, {
	createContext,
	FC,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

import { canUseDOM } from '../lib/canUseDOM';
import { SimpleEventChannel } from '../lib/SimpleEventChannel';

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const SSRContext = createContext(true);
export const SSREventManagerContext =
	createContext<SimpleEventChannel<boolean> | null>(null);

/**
 * Component which provide SSR context and force re-render on client side
 *
 * This behavior is required to first render on client will match with SSR structure
 * It may be useful for SEO purposes or graceful degradation to no-js level
 *
 * This component must be used on top level of application, and preferred only once
 */
export const SSRProvider: FC = ({ children }) => {
	const [isRendered, setIsRendered] = useState(false);

	const eventManagerRef = useRef<SimpleEventChannel<boolean> | null>(null);

	// Create event manager only on client side
	if (canUseDOM() && eventManagerRef.current === null) {
		eventManagerRef.current = new SimpleEventChannel<boolean>();
	}

	// Start client side render after render all children nodes
	useIsomorphicLayoutEffect(() => {
		setIsRendered(true);

		if (eventManagerRef.current !== null) {
			eventManagerRef.current.send(true);
		}
	}, []);

	return (
		<SSRContext.Provider value={isRendered}>
			<SSREventManagerContext.Provider value={eventManagerRef.current}>
				{children}
			</SSREventManagerContext.Provider>
		</SSRContext.Provider>
	);
};

/**
 * Hook to render content depends on render context (SSR/CSR)
 *
 * It will always return `false` on SSR and while first render on CSR,
 * but will `true` when all child nodes of `SSRProvider` will rendered on client side
 *
 * This hook should be used with `SSRProvider` parent, otherwise it will return `true` always
 */
export const useIsReadyToCSR = () => {
	const isReadyToCSR = useContext(SSRContext);
	const [isReady, setIsReady] = useState(isReadyToCSR);

	// Observe context, to update state for memoized components
	const eventManager = useContext(SSREventManagerContext);
	useEffect(() => {
		if (eventManager === null) return;

		eventManager.subscribe(setIsReady);
		return () => {
			eventManager.unsubscribe(setIsReady);
		};
	}, [eventManager]);

	return isReady || isReadyToCSR;
};
