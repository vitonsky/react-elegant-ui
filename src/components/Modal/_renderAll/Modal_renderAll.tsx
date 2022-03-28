import React from 'react';
import { useIsReadyToCSR } from '../../../hooks/useIsReadyToCSR';

import { withHOCConstructor } from '../../../lib/compose';

import { IModalProps } from '../Modal';

export interface IModModalRenderAll {
	renderAll?: boolean;
}

// TODO: Copy modifier to Popup
export const withModModalRenderAll = withHOCConstructor<
	IModModalRenderAll,
	IModalProps
>(
	{ matchProps: { renderAll: true }, matchOnlyProps: ['renderAll'] },
	(Component) => (props) => {
		const isCSR = useIsReadyToCSR();

		return (
			<Component
				{...props}
				scope={isCSR ? props.scope : undefined}
				keepMounted={isCSR ? props.keepMounted : true}
			/>
		);
	},
);
