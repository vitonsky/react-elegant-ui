import React, { FC } from 'react';

import { classList } from '../../lib/DOM';

import style from './Divider.module.css';

export const Divider: FC<{ className?: string; size?: 'm' | 'l' }> = ({
	className,
	size,
}) => {
	return (
		<hr
			className={classList(
				style.Divider,
				style['Divider_size_' + size],
				className,
			)}
		/>
	);
};

Divider.defaultProps = { size: 'm' };
