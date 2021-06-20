import { MergeHandler } from '../core';

/**
 * Merge arrays or set new value if new falue is array
 */
export const MergeArrays: MergeHandler = ({
	currentValue,
	value,
	setValue,
}) => {
	if (!Array.isArray(value)) return;

	// Set current array
	if (!Array.isArray(currentValue)) {
		setValue(value);
		return;
	}

	// Merge arrays
	setValue([...currentValue, ...value]);
};
