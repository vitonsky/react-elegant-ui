import React, { FC, HTMLAttributes } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import style from './CodeBlock.module.css';

const highlightStyles = {
	...monokai,
	hljs: { ...monokai.hljs, padding: 'var(--typography-controls-indent-xl)' },
};

export const CodeBlock: FC<HTMLAttributes<{}> & { className?: string }> = (
	props,
) => {
	const langSearch = (props.className ?? '').match(/lang-(.+)/);
	const language = langSearch !== null ? langSearch[1] : undefined;

	const isReachText =
		typeof props.children === 'string' && props.children.match(/\n/);

	return language || isReachText ? (
		<pre className={style.CodeBlock}>
			<SyntaxHighlighter language={language} style={highlightStyles}>
				{props.children}
			</SyntaxHighlighter>
		</pre>
	) : (
		<code {...props} className={style.CodeBlock} />
	);
};
