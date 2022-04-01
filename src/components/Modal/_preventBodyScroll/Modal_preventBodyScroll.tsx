import React from 'react';
import { usePreventScroll } from '../../../hooks/usePreventScroll';

import { withHOCConstructor } from '../../../lib/compose';

import { IModalProps } from '../Modal';

export interface IModModalPreventBodyScroll {
	preventBodyScroll?: boolean;
}

export const withModModalPreventBodyScroll = withHOCConstructor<
	IModModalPreventBodyScroll,
	IModalProps
>(
	{
		matchProps: { preventBodyScroll: true },
		matchOnlyProps: ['preventBodyScroll'],
	},
	(Component) => (props) => {
		usePreventScroll({ enabled: props.visible });

		return <Component {...props} />;
	},
);
