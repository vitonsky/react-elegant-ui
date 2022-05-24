import React, { FC, useState } from 'react';
import { Textarea, TextareaProps } from '../Textarea.bundle/desktop';

const placeholder = 'Input something';
const hint = 'Some hint text';

export const TextareaBase: FC<TextareaProps> = ({
	value: initValue,
	...props
}) => {
	const [value, setValue] = useState(initValue);
	return (
		<Textarea
			{...props}
			value={value}
			onInputText={setValue}
			onClearClick={() => {
				setValue('');
			}}
		/>
	);
};

export const Base = () => <TextareaBase placeholder={placeholder} />;

export const Disabled = () => (
	<TextareaBase placeholder={placeholder} disabled />
);

export const WithAutoResize = () => (
	<TextareaBase
		placeholder={placeholder}
		autoResize
		value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem libero voluptatem suscipit rem dolorum magnam, officia eum aperiam obcaecati? Quod porro, quia exercitationem iusto, accusamus esse illum sint voluptatem quas quibusdam repudiandae beatae fugiat labore at reprehenderit"
	/>
);

export const WithHint = () => (
	<TextareaBase placeholder={placeholder} hint={hint} />
);

export const WithClearButton = () => (
	<TextareaBase placeholder={placeholder} hasClear={true} />
);

export const WithStateError = () => (
	<>
		<div>
			<TextareaBase placeholder={placeholder} state="error" />
		</div>
		<br />
		<div>
			<TextareaBase placeholder={placeholder} hint={hint} state="error" />
		</div>
	</>
);
