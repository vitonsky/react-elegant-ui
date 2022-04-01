import React from 'react';
import { withHOCConstructor } from '../../../lib/compose';

import { cnModal, IModalProps } from '../Modal';

import './Modal_view_default.css';

export interface IModModalViewDefault {
	view?: 'default';
	hasAnimation?: boolean;
}

export const withModModalViewDefault = withHOCConstructor<
	IModModalViewDefault,
	IModalProps
>(
	{
		matchProps: {
			view: 'default',
		},
	},
	(Component) =>
		({ hasAnimation, view, ...props }) =>
			(
				<Component
					{...props}
					className={cnModal({ hasAnimation, view }, [
						props.className,
					])}
				/>
			),
);
