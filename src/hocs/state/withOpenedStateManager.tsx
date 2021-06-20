import React, { ComponentType, FC, useCallback, useState } from 'react';

import { IToggleable } from '../../types/features/IToggleable';

/**
 * HOC for control a togglable state
 *
 * This HOC for use as is, user defined `opened` and `setOpened` props will ignored
 */
export const withOpenedStateManager = <T extends IToggleable>(
	WrappedComponent: ComponentType<T>,
): ComponentType<T & IToggleable> => {
	const WithTogglable: FC<T & IToggleable> = (props) => {
		// Use init value
		const { opened } = props;
		const [isOpened, setIsOpened] = useState(!!opened);

		const setOpened = useCallback(
			(state: boolean) => {
				setIsOpened(state);
			},
			[setIsOpened],
		);

		return (
			<WrappedComponent
				{...props}
				opened={isOpened}
				setOpened={setOpened}
			/>
		);
	};

	return WithTogglable;
};
