import React, { createContext, RefObject, useContext } from 'react';

import { withHOCConstructor } from '../../../lib/compose';

import { IModalProps } from '../Modal';

export interface IModModalRenderToStack {
	renderToStack?: boolean;
}

export const ModalStackContext = createContext<RefObject<HTMLElement> | null>(
	null,
);

export const withModModalRenderToStack = withHOCConstructor<
	IModModalRenderToStack,
	IModalProps
>(
	{ matchProps: { renderToStack: true }, matchOnlyProps: ['renderToStack'] },
	(Component) => (props) => {
		const stack = useContext(ModalStackContext);
		return (
			<Component
				{...props}
				scope={stack !== null ? stack : props.scope}
			/>
		);
	},
);
