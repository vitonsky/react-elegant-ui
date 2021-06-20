import { ComponentType, FC, useMemo } from 'react';
import {
	Popup as PopupBase,
	IPopupProps,
} from 'react-elegant-ui/components/Popup/Popup.bundle/desktop';
import { compose } from 'react-elegant-ui/lib/compose';

import { classList } from '../../lib/DOM';
import styles from './Popup.module.css';

// HOC with local styles
const withStyleFix = (
	Component: ComponentType<IPopupProps>,
): FC<IPopupProps> => (props) => {
	const className = useMemo(
		() =>
			classList(
				props.className,
				styles.Popup,
				props.visible ? styles.Popup_visible : undefined,
			),
		[props.className, props.visible],
	);

	return <Component {...props} className={className} />;
};

// Build with fix styles
export * from 'react-elegant-ui/components/Popup/Popup.bundle/desktop';
export const Popup = compose(withStyleFix)(PopupBase);
