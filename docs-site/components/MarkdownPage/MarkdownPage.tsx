import React, { FC, useMemo } from 'react';
import { cn } from '@bem-react/classname';
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';

import { Link } from '../Link/Link';
import { Divider } from '../Divider/Divider';
import { CodeBlock } from '../CodeBlock/CodeBlock';

import styles from './MarkdownPage.module.css';
import { classList } from '../../lib/DOM';

export interface MarkdownPageProps {
	children: string;
}

export const cnMarkdownPage = cn('MarkdownPage');

const overrides: MarkdownToJSX.Overrides = {
	...(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).reduce((acc, Header) => {
		acc[Header] = {
			component: (props) => (
				<Header
					{...props}
					className={classList(styles.Header, props.className)}
				>
					<Link
						// FIXME: ID is not unique! If exists 2 headers with same titles will make 2 same id
						// it must be fixed with add header nesting prefix for duplicates
						href={`#${props.id}`}
						className={styles['Header-Link']}
						title={`Anchor to "${props.children}"`}
					>
						#
					</Link>
					{props.children}
				</Header>
			),
			props: { className: 'header' },
		};

		return acc;
	}, {} as MarkdownToJSX.Overrides),
	a: Link,
	hr: {
		component: Divider,
		props: { size: 'l' },
	},
	code: CodeBlock,
};

// TODO: prevent parsing. Get AST from JSON instead raw text and then render it fast
export const MarkdownPage: FC<MarkdownPageProps> = ({ children }) => {
	const page = useMemo(
		() => <Markdown options={{ overrides }}>{children}</Markdown>,
		[children],
	);

	return <div className={styles.MarkdownPage}>{page}</div>;
};
