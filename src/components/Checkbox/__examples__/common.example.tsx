import React, { FC, useEffect, useRef, useState } from 'react';
import { useUniqueId } from '../../../hooks/useUniqueId';

import { Checkbox, ICheckboxProps } from '../Checkbox.bundle/desktop';

const verbose = true;

export const CheckboxWithState: FC<ICheckboxProps> = (props) => {
	const [isEnabled, setState] = useState(props.checked);

	const toggleCounter = useRef(0);
	useEffect(() => {
		if (!verbose) return;

		// Skip init
		if (toggleCounter.current++ === 0) return;

		console.log(
			`checkbox "${props.label ?? 'unknown'}" toggle to`,
			isEnabled,
		);
	}, [isEnabled, props.label]);

	return <Checkbox {...props} checked={!!isEnabled} setChecked={setState} />;
};

export const BaseCheckbox: FC = () => {
	const liClass = useUniqueId('exampleList');

	const style = `
		.${liClass} {
			list-style: none;
			margin: 0;
			padding: 0;
		}

		.${liClass} li:not(:last-child) {
			margin-bottom: .5rem;
		}
	`;

	return (
		<>
			<style>{style}</style>
			<ul className={liClass}>
				{Array(4)
					.fill(0)
					.map((_, idx) => {
						const disabled = idx > 1;

						return (
							<li key={idx}>
								<CheckboxWithState
									label={
										`Checkbox #${idx + 1}` +
										(disabled ? ' (disabled)' : '')
									}
									disabled={disabled}
									checked={(idx + 1) % 2 !== 0}
								/>
							</li>
						);
					})}
				<li>
					<CheckboxWithState
						label={
							<span>
								Some text <strong>as node</strong>
							</span>
						}
						checked
					/>
				</li>
				<li>
					<CheckboxWithState
						label="Indeterminate checkbox"
						indeterminate
					/>
				</li>
			</ul>
		</>
	);
};

export const CheckboxInlineExample = () => {
	return (
		<div>
			Choose between <CheckboxWithState label="some value" /> and some{' '}
			<CheckboxWithState label="other value" size="s" />
		</div>
	);
};
