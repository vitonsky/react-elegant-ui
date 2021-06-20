import React, { ComponentType, FC } from 'react';
import { useFocusVisible } from '@react-aria/interactions';
import { cn } from '@bem-react/classname';

import { getDisplayName } from '../lib/getDisplayName';

/**
 * HOC which add class `focusVisible` while user focus with keyboard
 */
export const withFocusVisible = (blockName: string) => <
	T extends { className?: string }
>(
		Component: ComponentType<T>,
	) => {
	const blockNameCn = cn(blockName);

	const HOC: FC<T> = (props) => {
		const { isFocusVisible } = useFocusVisible();

		return (
			<Component
				{...props}
				className={blockNameCn({ focusVisible: isFocusVisible }, [
					props.className,
				])}
			/>
		);
	};

	HOC.displayName = `withFocusVisible(${getDisplayName(Component)})`;

	return HOC;
};
