import React, {
	ComponentType,
	FC,
	useRef,
	useCallback,
	useEffect,
} from 'react';

import { runByReadyState } from '../../../lib/runByReadyState';
import { useMergeContext } from '../../../hooks/useMergeContext';

import { ITextareaProps, cnTextarea } from '../Textarea';
import { TextareaWrapContext } from '../Wrap/Textarea-Wrap';
import { TextareaControlContext } from '../Control/Textarea-Control';

/**
 * HOC implements auto resize of wrapper
 */
export const withAutoResize = <T extends ITextareaProps>(
	WrappedComponent: ComponentType<T>,
): FC<T> => (props) => {
		const controlRefInner = useRef<HTMLTextAreaElement>(null);
		const wrapRefInner = useRef<HTMLDivElement>(null);

		// TODO: improve algorithm to consider scroll size for unlimit height
		const updateHeight = useCallback(() => {
			const controlElm = controlRefInner.current;
			const wrapElm = wrapRefInner.current;

			if (controlElm === null || wrapElm === null) return;

			wrapElm.style.height = 'auto';

			// For cases when after resize will create scroll and it influence to size, resize do twice
			let i = 2;
			while (controlElm.scrollHeight > controlElm.offsetHeight && i--) {
				const padding = controlElm.offsetHeight - controlElm.clientHeight;
				wrapElm.style.height = `${controlElm.scrollHeight + padding}px`;
			}
		}, []);

		// Update size every render
		useEffect(updateHeight);

		// Fix size after loading resources
		// need run it only once
		// eslint-disable-next-line react-hooks/exhaustive-deps
		useEffect(() => runByReadyState(updateHeight, 'complete'), []);

		const wrapCtx = useMergeContext(TextareaWrapContext, {
			innerRef: wrapRefInner,
		});

		const controlCtx = useMergeContext(TextareaControlContext, {
			innerRef: controlRefInner,
		});

		return (
			<TextareaWrapContext.Provider value={wrapCtx}>
				<TextareaControlContext.Provider value={controlCtx}>
					<WrappedComponent
						{...props}
						className={cnTextarea({ autoResize: true }, [
							props.className,
						])}
					/>
				</TextareaControlContext.Provider>
			</TextareaWrapContext.Provider>
		);
	};
