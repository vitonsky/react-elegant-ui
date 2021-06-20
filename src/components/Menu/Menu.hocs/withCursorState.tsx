import React, { useState } from 'react';
import { withHOCConstructor } from '../../../lib/compose';

import { IMenuProps } from '../Menu';

// TODO: unify it, make interface and move to HOC `withCursorStateManager`
/**
 * HOC for control cursor state by default
 */
export const withCursorState = withHOCConstructor<{}, IMenuProps>(
	{ matchProps: { setCursorIndex: undefined } },
	(Menu) => (props) => {
		const [index, setIndex] = useState(props.cursorIndex);
		return (
			<Menu {...props} cursorIndex={index} setCursorIndex={setIndex} />
		);
	},
);
