import React, {
	RefObject,
	ReactNode,
	FC,
	CSSProperties,
	ReactElement,
	Ref,
	useRef,
	MouseEventHandler,
} from 'react';
import { createPortal } from 'react-dom';
import { useComponentRegistry } from '@bem-react/di';
import { cn } from '@bem-react/classname';

import { IComponentHTMLElement } from '../../types/IComponent';
import { canUseDOM } from '../../lib/canUseDOM';
import { useRefMix } from '../../hooks/useRefMix';

import { OnClose, LayerManager } from '../LayerManager/LayerManager';
import { IPopupRegistry } from './Popup.registry';
import './Popup.css';

export interface IPopupProps extends IComponentHTMLElement<HTMLDivElement> {
	visible?: boolean;

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

	/**
	 * Render content in DOM regardless of visible state. It useful for SEO purposes.
	 *
	 * When true, `scope` property ignore on server and component will render in call place for first render
	 */
	renderAll?: boolean;

	/**
	 * Like `renderAll` but don't force direct render
	 */
	keepMounted?: boolean;

	/**
	 * Option that determines whether to render the tail or not
	 */
	hasTail?: boolean;
	tailRef?: Ref<HTMLDivElement>;

	style?: CSSProperties;
	zIndex?: number;

	/**
	 * Popup content
	 *
	 * You can give a special function who take `tailRef`
	 */
	children?:
		| ReactNode
		| ((props: { tailRef?: Ref<HTMLDivElement> }) => ReactNode);

	addonBefore?: ReactNode;
	addonAfter?: ReactNode;

	onClick?: MouseEventHandler<HTMLDivElement>;

	/**
	 * Handler of close by esc key or click outside of popup
	 */
	onClose?: OnClose;

	/**
	 * Function that call while render tail
	 * Call independent of `hasTail`
	 */
	UNSTABLE_onRenderTail?: (tail: ReactElement) => ReactElement;

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
}

export const cnPopup = cn('Popup');

/**
 * Component to make pop-up windows
 * @param {IPopupProps} props
 */
export const Popup: FC<IPopupProps> = ({
	visible,
	renderAll,
	keepMounted,
	scope,
	hasTail,
	tailRef,
	zIndex,
	style,
	className,
	innerRef,
	children,
	addonAfter,
	addonBefore,
	onClick,
	onClose,
	UNSTABLE_onRenderTail,
	essentialRefs = [],
	hostRef: propsHostRef,
	...props
}: IPopupProps) => {
	const { Tail } = useComponentRegistry<IPopupRegistry>(cnPopup());

	const containerRef = useRef(null);
	const hostRef = propsHostRef || containerRef;

	const containerRefMix = useRefMix(containerRef, innerRef);

	const scopeRef = scope?.current ?? null;

	// skip render on SSR
	if (scopeRef !== null && !canUseDOM()) {
		return null;
	}

	// skip render a invisible
	if (!renderAll && !visible && !keepMounted) {
		return null;
	}

	const renderedComponent = (
		<LayerManager
			visible={visible}
			onClose={onClose}
			essentialRefs={[hostRef, ...essentialRefs]}
		>
			<div
				{...props}
				className={cnPopup({ visible }, [className])}
				ref={containerRefMix}
				style={{ ...style, zIndex }}
				onClick={onClick}
			>
				{addonBefore}
				{typeof children === 'function'
					? children({ tailRef })
					: children}
				{addonAfter}
				{UNSTABLE_onRenderTail &&
					UNSTABLE_onRenderTail(<Tail innerRef={tailRef} />)}
				{!UNSTABLE_onRenderTail && hasTail && (
					<Tail innerRef={tailRef} />
				)}
			</div>
		</LayerManager>
	);

	// TODO: render it without `createPortal` on server when `renderAll` is true and switch to `createPortal` on client

	// we need some hack to prevent invalidaton while hidratation
	// for example, use hook which use SSR context and first render work as on server,
	// but after full render content of context, it change value and force rerender content of components which use hook

	//
	// EXAMPLE
	//

	// const isSSRContext = useSSRContext();

	// // Force render without `createPortal`, only for SSR and first render on client
	// if (isSSRContext && renderAll) {
	// 	return renderedComponent;
	// }

	// // Usual render
	// return scopeRef !== null ? createPortal(renderedComponent, scopeRef) : renderedComponent;

	//
	// EXAMPLE
	//

	return scopeRef !== null
		? createPortal(renderedComponent, scopeRef)
		: renderedComponent;
};

Popup.displayName = cnPopup();
