import { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@bem-react/classname';

import styles from './Layout.module.css';

export interface LayoutProps extends HTMLAttributes<{}> {
	nav?: ReactNode;
	footer?: ReactNode;
}

export const cnLayout = cn('Layout');

export const Layout: FC<LayoutProps> = ({ nav, footer, children }) => {
	return (
		<div className={styles.Layout}>
			{nav ? (
				<div className={styles.Navigation}>
					<div className={styles['Navigation-Container']}>{nav}</div>
				</div>
			) : undefined}
			<div className={styles.Page}>
				<div className={styles.Content}>{children}</div>
				{footer ? (
					<div className={styles.Footer}>{footer}</div>
				) : undefined}
			</div>
		</div>
	);
};
