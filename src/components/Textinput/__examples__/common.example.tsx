import React, { FC, useState } from 'react';
import { Icon } from '../../Icon/Icon.bundle/desktop';
import { Textinput, TextinputProps } from '../Textinput.bundle/desktop';

const placeholder = 'Input something';
const hint = 'Some hint text';

export const TextinputBase: FC<TextinputProps> = ({
	value: initValue,
	...props
}) => {
	const [value, setValue] = useState(initValue ?? '');
	return (
		<Textinput
			{...props}
			value={value}
			onChange={(evt) => setValue(evt.target.value)}
			onClearClick={() => {
				setValue('');
			}}
		/>
	);
};

export const Base = () => (
	<>
		<TextinputBase spellCheck={false} placeholder={placeholder} size="m" />
		<br />
		<br />
		<TextinputBase spellCheck={false} placeholder={placeholder} size="s" />
	</>
);

export const Disabled = () => (
	<TextinputBase spellCheck={false} placeholder={placeholder} disabled />
);

export const WithHint = () => (
	<TextinputBase spellCheck={false} placeholder={placeholder} hint={hint} />
);

export const WithIcon = () => (
	<TextinputBase
		spellCheck={false}
		placeholder={placeholder}
		iconLeft={<Icon glyph="close" size="l" />}
		iconRight={<Icon glyph="close" size="l" />}
		hasClear
	/>
);

export const WithClearButton = () => (
	<TextinputBase
		spellCheck={false}
		placeholder={placeholder}
		hasClear={true}
		value="Stet justo tempor invidunt sit justo elitr est."
	/>
);

export const WithStateError = () => (
	<>
		<div>
			<TextinputBase
				spellCheck={false}
				placeholder={placeholder}
				state="error"
			/>
		</div>
		<br />
		<div>
			<TextinputBase
				spellCheck={false}
				placeholder={placeholder}
				hint={hint}
				state="error"
			/>
		</div>
	</>
);
