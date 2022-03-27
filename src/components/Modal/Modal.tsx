import React, { useRef, FC, RefObject } from 'react';
import { cn } from '@bem-react/classname';

import { IComponentHTMLElement } from '../../types/IComponent';
import { LayerManager, OnClose } from '../LayerManager/LayerManager';

import './Modal.css';

export const cnModal = cn('Modal');

export interface IModalProps extends IComponentHTMLElement<HTMLDivElement> {
	visible?: boolean;

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

	zIndex?: number;
}

// TODO: render it to portal to show it even when render called in node with `overflow: hide`
// TODO: add vanishing animation to desktop view
// TODO: implement and use focus catcher
// TODO: implement option preventBodyScroll
// TODO: implement keepMounted option
export const Modal: FC<IModalProps> = ({
	visible,
	contentVerticalAlign: align = 'middle',
	onClose,
	essentialRefs = [],
	hostRef: propsHostRef,
	children,
	innerRef,
	zIndex,
	...props
}) => {
	const contentRef = useRef(null);

	return (
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
};

Modal.displayName = cnModal();
