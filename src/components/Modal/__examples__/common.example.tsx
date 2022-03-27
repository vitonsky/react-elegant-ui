import React, { FC, useRef, useState } from 'react';

import { Button } from '../../Button/Button.bundle/desktop';
import { ComplexPopup } from '../../LayerManager/__examples__/common.example';
import { Modal } from '../Modal.bundle/desktop';

export const BasicExample: FC = () => {
	const btnRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div style={{ position: 'relative' }}>
			<Button innerRef={btnRef} onPress={() => setIsVisible(true)}>
				Open modal window
			</Button>
			<Modal
				visible={isVisible}
				view="default"
				zIndex={1}
				onClose={() => setIsVisible(false)}
			>
				<div style={{ padding: '1rem' }}>
					Lorem ipsum dolor sit amet.
					<br />
					<br />
					<Button
						innerRef={btnRef}
						onPress={() => setIsVisible(false)}
					>
						Close window
					</Button>
				</div>
			</Modal>
		</div>
	);
};

export const ComplexExample: FC = () => {
	const btnRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div style={{ position: 'relative' }}>
			<Button innerRef={btnRef} onPress={() => setIsVisible(true)}>
				Open modal window
			</Button>
			<Modal
				visible={isVisible}
				view="default"
				zIndex={1}
				onClose={() => setIsVisible(false)}
			>
				<div style={{ padding: '1rem' }}>
					Lorem ipsum dolor sit amet.
					<br />
					<br />
					<ComplexPopup />
					<br />
					<br />
					<Button
						innerRef={btnRef}
						onPress={() => setIsVisible(false)}
					>
						Close window
					</Button>
				</div>
			</Modal>
		</div>
	);
};
