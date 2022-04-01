// Imported from yandex-ui. Source: https://github.com/bem/yandex-ui/

import { RefObject, useRef } from 'react';

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
import * as ScrollLocker from '../lib/scroll-locker';

export interface UsePreventScrollOptions {
	enabled: boolean | undefined;
	containerRef?: RefObject<HTMLElement>;
}

/**
 * @example
 * const Modal: FC<ModalProps> = (props) => {
 *   const { visible } = props;
 *   const containerRef = useRef(document.documentElement);
 *
 *   usePreventScroll({ enabled: visible, containerRef });
 *
 *   ...
 * }
 */
export function usePreventScroll(options: UsePreventScrollOptions) {
	const { enabled, containerRef } = options;
	const elementRef = useRef<HTMLElement | null>(null);
	const lockedRef = useRef(false);

	useLayoutEffect(() => {
		const container = containerRef ? containerRef.current : null;

		if (elementRef.current === container) {
			return;
		}

		// Handle change ref object
		if (enabled && lockedRef.current) {
			ScrollLocker.unlock(elementRef.current);
			ScrollLocker.lock(container);
		}

		elementRef.current = container;
	});

	useLayoutEffect(() => {
		if (!enabled) {
			return;
		}

		lockedRef.current = true;
		ScrollLocker.lock(elementRef.current);

		return () => {
			lockedRef.current = false;
			ScrollLocker.unlock(elementRef.current);
		};
	}, [enabled]);
}
