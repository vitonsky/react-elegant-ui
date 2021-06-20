import React, { FC } from 'react';

import { cnMenu } from '../Menu';
import './Menu-Group.css';

export interface IMenuGroup {
	title?: string;
	className?: string;
	hidden?: boolean;
}

export const MenuGroup: FC<IMenuGroup> = (props) => {
	const { title, className, hidden, children } = props;
	return (
		<div className={cnMenu('Group', { hidden }, [className])}>
			{title ? (
				<div className={cnMenu('GroupTitle')}>{title}</div>
			) : undefined}
			{children}
		</div>
	);
};
