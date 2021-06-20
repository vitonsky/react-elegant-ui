import React, { FC, useCallback, LinkHTMLAttributes } from 'react';
import { useRouter } from 'next/router';
import { useFocusVisible } from '@react-aria/interactions';

import { classList } from '../../lib/DOM';

import style from './Link.module.css';

export const BaseLink: FC<
	LinkHTMLAttributes<HTMLAnchorElement> & { target?: string }
> = (props) => {
	const { push } = useRouter();
	const { isFocusVisible } = useFocusVisible();

	const { href, target, onClick } = props;

	const onClickHandler: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
		(evt) => {
			// Use router instead default behavior
			if (!!href && target !== '_blank') {
				const linkPath = href;

				// Ignore anchor behavior
				if (linkPath.match(/^#/)) {
					return;
				}

				evt.preventDefault();

				if (linkPath.match(/^(\.{1,}\/)/)) {
					// Handle relative paths
					const currentPath = location.pathname.split('/');

					const calculatedPath = linkPath
						.split('/')
						.reduce((acc, part) => {
							const isEmptyPath = acc.length === 1;
							return part === '..'
								? isEmptyPath
									? acc
									: acc.slice(0, acc.length - 1)
								: acc.concat(part);
						}, currentPath.slice(0, -1))
						.join('/');

					const normalizedPath = (calculatedPath === ''
						? '/'
						: calculatedPath
					).replace(/\/{2,}/, '/');

					push(normalizedPath);
				} else {
					push(linkPath);
				}
			}

			if (onClick !== undefined) {
				onClick(evt);
			}
		},
		[href, onClick, push, target],
	);

	const focusVisible = isFocusVisible ? style.Link_focusVisible : undefined;

	return (
		<a
			{...props}
			className={classList(props.className, style.Link, focusVisible)}
			onClick={onClickHandler}
		/>
	);
};

export const Link: FC<
	LinkHTMLAttributes<HTMLAnchorElement> & { target?: string }
> = (props) => {
	// Open outside links in new tab
	const target =
		props.href && props.href.match(/^https?:/) ? '_blank' : props.target;

	return <BaseLink {...props} target={target} />;
};
