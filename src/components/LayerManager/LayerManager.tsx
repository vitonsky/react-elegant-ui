// Imported from yandex-ui. Source: https://github.com/bem/yandex-ui/

import React, {
	FC,
	useEffect,
	RefObject,
	ReactNode,
	useRef,
	useMemo,
	useCallback,
} from 'react';
import { useImmutableCallback } from '../../hooks/useImmutableCallback';

import { usePrevious } from '../../hooks/usePrevious';
import { useUniqueId } from '../../hooks/useUniqueId';
import { isKeyCode, Keys } from '../../lib/keyboard';

export type OnClose = (
	event: KeyboardEvent | MouseEvent,
	source: 'esc' | 'click',
) => void;

type LayerEntry = {
	id: string;
	essentialRefs: RefObject<HTMLElement>[];
	onClose?: OnClose;
};

// TODO: replace global object to context
const LayerRegistry = {
	stack: [] as LayerEntry[],
};

function removeLayerById(layerId: string) {
	LayerRegistry.stack = LayerRegistry.stack.filter(
		({ id }) => id !== layerId,
	);
}

export type LayerManagerProps = {
	/**
	 * Layer visibility
	 */
	visible?: boolean;

	/**
	 * Handler that call while close layer by esc key or by mouse click outside
	 */
	onClose?: OnClose;

	/**
	 * Array of Refs to DOM nodes who should not handle interactions to close
	 */
	essentialRefs: RefObject<HTMLElement>[];

	/**
	 * Layer content
	 */
	children: ReactNode;
};

/**
 * Component to manage layers of pop-up components like `Popup` or `Modal`
 *
 * It allow close elements in that order what it did open
 *
 * @param {LayerManagerProps}
 */
export const LayerManager: FC<LayerManagerProps> = ({
	visible,
	onClose,
	children,
	essentialRefs,
}) => {
	const id = useUniqueId('layer');

	const prevOnClose = usePrevious(onClose);
	const mouseDownRef = useRef<EventTarget | null>(null);

	// Collect ShadowRoot nodes from essential refs
	const shadowRoots = useMemo(() => {
		return essentialRefs.reduce((acc, ref) => {
			const node = ref.current;

			// Push to acc unique shadow roots
			if (node !== null) {
				const root = node.getRootNode();
				if (root instanceof ShadowRoot && acc.indexOf(root) === -1) {
					acc.push(root);
				}
			}

			return acc;
		}, [] as ShadowRoot[]);
	}, [essentialRefs]);

	const isEssentialShadowRootHost = useCallback(
		(node: null | EventTarget) =>
			node === null
				? false
				: shadowRoots.some((root) => root.host === node),
		[shadowRoots],
	);

	const onDocumentKeyUp = useImmutableCallback(
		(event: KeyboardEvent) => {
			if (isKeyCode(event.code, Keys.ESC)) {
				const { id: layerId, onClose: layerOnClose } =
					LayerRegistry.stack[LayerRegistry.stack.length - 1] || {};

				// Check id cuz we just take last item and should verify
				if (layerId === id && layerOnClose !== undefined) {
					layerOnClose(event, 'esc');
				}
			}
		},
		[id],
	);

	// Remember mouse down target
	const onDocumentMouseDown = useImmutableCallback(
		(event: MouseEvent) => {
			// Skip click on ShadowRoot. It will handle in next callback
			if (isEssentialShadowRootHost(event.target)) return;

			mouseDownRef.current = event.target;
		},
		[isEssentialShadowRootHost],
	);

	const onDocumentClick = useImmutableCallback(
		(event: MouseEvent) => {
			const {
				id: layerId,
				onClose: layerOnClose,
				essentialRefs: refs,
			} = LayerRegistry.stack[LayerRegistry.stack.length - 1] || {};

			// Skip click on ShadowRoot. It will handle in next callback
			if (isEssentialShadowRootHost(event.target)) return;

			// Check that target is same as in last mouse down event
			// It need to prevent close by dragging the cursor (for example while select text)
			if (mouseDownRef.current !== event.target) return;

			// Check id cuz we just take last item and should verify
			if (
				layerId === id &&
				layerOnClose !== undefined &&
				refs !== undefined
			) {
				const isEssentionalClick = refs.some(
					(ref) =>
						ref.current !== null &&
						ref.current instanceof HTMLElement &&
						ref.current.contains(event.target as HTMLElement),
				);
				if (!isEssentionalClick) {
					layerOnClose(event, 'click');
				}
			}
		},
		[id, isEssentialShadowRootHost],
	);

	// Toggle event handlers
	useEffect(() => {
		// Skip invisible
		if (!visible) return;

		// Global events
		document.addEventListener('keyup', onDocumentKeyUp);
		document.addEventListener('mousedown', onDocumentMouseDown, true);
		document.addEventListener('click', onDocumentClick, true);

		// Events on ShadowRoot nodes
		shadowRoots.forEach((root) => {
			root.addEventListener(
				'mousedown',
				onDocumentMouseDown as EventListenerOrEventListenerObject,
				true,
			);
			root.addEventListener(
				'click',
				onDocumentClick as EventListenerOrEventListenerObject,
				true,
			);
		});

		return () => {
			// Global events
			document.removeEventListener('keyup', onDocumentKeyUp);
			document.removeEventListener(
				'mousedown',
				onDocumentMouseDown,
				true,
			);
			document.removeEventListener('click', onDocumentClick, true);

			// Events on ShadowRoot nodes
			shadowRoots.forEach((root) => {
				root.removeEventListener(
					'mousedown',
					onDocumentMouseDown as EventListenerOrEventListenerObject,
					true,
				);
				root.removeEventListener(
					'click',
					onDocumentClick as EventListenerOrEventListenerObject,
					true,
				);
			});
		};
	}, [
		visible,
		onDocumentKeyUp,
		onDocumentMouseDown,
		onDocumentClick,
		shadowRoots,
	]);

	// Update stack
	useEffect(() => {
		const cleanup = () => removeLayerById(id);

		if (visible) {
			LayerRegistry.stack.push({
				id,
				onClose,
				essentialRefs,
			});
		} else {
			cleanup();
		}

		return cleanup;
		// must update only by change `visible`
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible]);

	// Update callback in stack
	useEffect(() => {
		if (onClose !== prevOnClose) {
			LayerRegistry.stack.forEach((layer) => {
				if (layer.onClose === prevOnClose) {
					layer.onClose = onClose;
				}
			});
		}
	}, [onClose, prevOnClose]);

	return <>{children}</>;
};

LayerManager.displayName = 'LayerManager';
