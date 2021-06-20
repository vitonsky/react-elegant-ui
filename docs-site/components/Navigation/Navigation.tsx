import React, { FC, useMemo } from 'react';

import { Link } from '../Link/Link';
import { classList } from '../../lib/DOM';

import style from './Navigation.module.css';

export type NavItem = {
	title: string;
	path: string;
};

export type NavGroup = {
	title?: string;
	child: NavEntry[];
};

export type NavEntry = NavGroup | NavItem;

export type NavigationProps = {
	children: NavEntry[];

	/**
	 * Current active item
	 */
	active?: string;
};

const recursiveRender = (
	tree: NavEntry[],
	activeItem?: string,
	treeIndex = 0,
) => {
	return (
		<ul key={'tree' + treeIndex} className={style.Navigation}>
			{tree.map((entry, idx) => {
				const entryIndex = `${treeIndex}-${idx}`;

				if ('path' in entry) {
					// Item
					const { title, path } = entry;

					const activeClass =
						path === activeItem
							? style['Navigation-Item_active']
							: undefined;

					return (
						<li
							key={entryIndex}
							className={classList(
								activeClass,
								style['Navigation-Item'],
							)}
						>
							<Link href={path}>{title}</Link>
						</li>
					);
				} else {
					// Group
					const { title, child } = entry;

					return (
						<li
							key={entryIndex}
							className={style['Navigation-Container']}
						>
							<h3 className={style['Navigation-Title']}>
								{title}
							</h3>
							{recursiveRender(child, activeItem, ++treeIndex)}
						</li>
					);
				}
			})}
		</ul>
	);
};

export const Navigation: FC<NavigationProps> = ({ children, active }) => {
	const renderResult = useMemo(() => recursiveRender(children, active), [
		children,
		active,
	]);
	return renderResult;
};
