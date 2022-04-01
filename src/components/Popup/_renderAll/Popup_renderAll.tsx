import React from 'react';
import { useIsReadyToCSR } from '../../../hooks/useIsReadyToCSR';

import { withHOCConstructor } from '../../../lib/compose';

import { IPopupProps } from '../Popup';

export interface IModPopupRenderAll {
	renderAll?: boolean;
}

export const withModPopupRenderAll = withHOCConstructor<
	IModPopupRenderAll,
	IPopupProps
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
