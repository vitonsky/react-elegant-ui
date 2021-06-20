import { MergeHandler } from '../core';

/**
 * Merge react component className properties
 */
export const MergeReactClassnames: MergeHandler = ({
	key,
	currentValue,
	value,
	setValue,
}) => {
	if (key !== 'className') return;

	const newCn = [currentValue, value].filter(
		(cn) => typeof cn === 'string' && cn.length > 0,
	);

	setValue(newCn.join(' '));
};
