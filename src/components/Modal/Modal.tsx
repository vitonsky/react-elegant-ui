import React, { useRef, FC, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@bem-react/classname';

import { canUseDOM } from '../../lib/canUseDOM';
import { IComponentHTMLElement } from '../../types/IComponent';
import { LayerManager, OnClose } from '../LayerManager/LayerManager';

import './Modal.css';

export const cnModal = cn('Modal');

export interface IModalProps extends IComponentHTMLElement<HTMLDivElement> {
	visible?: boolean;

	keepMounted?: boolean;

	contentVerticalAlign?: 'top' | 'middle' | 'bottom';

	/**
	 * Handler of close by esc key or click outside of popup
	 */
	onClose?: OnClose;

	/**
	 * Array of Refs to DOM nodes who should not handle interactions to close
	 *
	 * @internal
	 */
	essentialRefs?: RefObject<HTMLElement>[];

	/**
	 * DOM node that should not handle interactions to close
	 *
	 * @internal
	 */
	hostRef?: RefObject<HTMLElement>;

	/**
	 * Ref on DOM element to render popup there
	 *
	 * This element should have `position: relative`
	 *
	 * If your block have `overflow hidden`, use external container to render popup to prevent clipping
	 *
	 * WARNING: this feature use a `createPortal`, hence it for client-side only, and SSR will skip render
	 */
	scope?: RefObject<HTMLElement>;

	zIndex?: number;
}

// TODO: implement and use focus catcher

// TODO: implement wrapper and modifier `renderToWindowsStack` which use context to render in stack wrapper
// TODO: second opened window may be under previous. We should manage z-index automatically
export const Modal: FC<IModalProps> = ({
	visible,
	keepMounted,
	contentVerticalAlign: align = 'middle',
	onClose,
	essentialRefs = [],
	hostRef: propsHostRef,
	children,
	innerRef,
	scope,
	zIndex,
	...props
}) => {
	const contentRef = useRef(null);

	const scopeRef = scope?.current ?? null;

	// skip render on SSR
	if (scopeRef !== null && !canUseDOM()) {
		return null;
	}

	// skip render non visible component
	if (!visible && !keepMounted) {
		return null;
	}

	const renderedComponent = (
		<LayerManager
			visible={visible}
			onClose={onClose}
			essentialRefs={[contentRef, ...essentialRefs]}
		>
			<div
				ref={innerRef}
				{...props}
				className={cnModal({ visible }, [props.className])}
				style={{ zIndex, ...props.style }}
			>
				<div className={cnModal('Overlay')} />
				<div className={cnModal('Wrapper')}>
					<div className={cnModal('Table')}>
						<div className={cnModal('Cell', { align })}>
							<div
								ref={contentRef}
								className={cnModal('Content')}
								tabIndex={-1}
								role="dialog"
								aria-modal
							>
								{children}
							</div>
						</div>
					</div>
				</div>
			</div>
		</LayerManager>
	);

	return scopeRef !== null
		? createPortal(renderedComponent, scopeRef)
		: renderedComponent;
};

Modal.displayName = cnModal();
