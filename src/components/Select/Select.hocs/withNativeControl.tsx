import React, { ComponentType, FC, useCallback, useMemo } from 'react';

import {
	ISelectProps,
	Option,
	cnSelect,
	getTextOfOption,
	isGroup,
} from '../Select';
import { SelectNativeControl } from '../NativeControl/Select-NativeControl';

const renderOptions = (options: Option[]): JSX.Element[] =>
	options.map((option, idx) => {
		if (isGroup(option)) {
			return (
				<optgroup label={option.title} hidden={option.hidden} key={idx}>
					{renderOptions(option.items)}
				</optgroup>
			);
		}

		return (
			<option
				value={option.id}
				hidden={option.hidden}
				disabled={option.disabled}
				key={idx}
			>
				{getTextOfOption(option)}
			</option>
		);
	});

/**
 * HOC who render native select for touch devices
 */
export const withNativeControl = (
	BaseComponent: ComponentType<ISelectProps>,
): FC<ISelectProps> => (props: ISelectProps) => {
	const { options, value, disabled, setValue, addonAfter } = props;

	const isMultiple = Array.isArray(value);

	const onChange = useCallback(
		(evt: React.ChangeEvent<HTMLSelectElement>) => {
			if (setValue !== undefined) {
				const value = !isMultiple
					? evt.target.value
					: Array.from(
						evt.target.selectedOptions,
						(option) => option.value,
					  );

				setValue(value);
			}
		},
		[isMultiple, setValue],
	);

	const renderedOptions = useMemo(() => renderOptions(options), [options]);

	return (
		<BaseComponent
			{...props}
			options={options}
			value={value}
			addonAfter={
				<>
					<SelectNativeControl
						className={cnSelect('NativeControl')}
						disabled={disabled}
						multiple={isMultiple}
						value={value}
						onChange={onChange}
						tabIndex={-1}
					>
						{renderedOptions}
					</SelectNativeControl>
					{addonAfter}
				</>
			}
		/>
	);
};
