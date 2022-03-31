import React, { FC, useRef, useState } from 'react';

import { Button } from '../../Button/Button.bundle/desktop';
import { ComplexPopup } from '../../LayerManager/__examples__/common.example';
import { Modal } from '../Modal.bundle/desktop';
import { ModalStackContext } from '../_renderToStack/Modal_renderToStack';

export const BasicExample: FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div style={{ position: 'relative' }}>
			<Button onPress={() => setIsVisible(true)}>
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
					<Button onPress={() => setIsVisible(false)}>
						Close window
					</Button>
				</div>
			</Modal>
		</div>
	);
};

export const ComplexExample: FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div style={{ position: 'relative' }}>
			<Button onPress={() => setIsVisible(true)}>
				Open modal window
			</Button>
			<Modal
				visible={isVisible}
				view="default"
				zIndex={1}
				onClose={() => setIsVisible(false)}
				keepMounted
				preventBodyScroll
			>
				<div style={{ padding: '1rem' }}>
					Lorem ipsum dolor sit amet.
					<br />
					<br />
					<ComplexPopup />
					<br />
					<br />
					<Button onPress={() => setIsVisible(false)}>
						Close window
					</Button>
				</div>
			</Modal>
		</div>
	);
};

export const RenderToScope: FC = () => {
	const [isVisible1, setIsVisible1] = useState(false);
	const [isVisible2, setIsVisible2] = useState(false);
	const [isVisible3, setIsVisible3] = useState(false);

	const containerRef = useRef<HTMLDivElement | null>(null);
	const modalsRef = useRef<HTMLDivElement | null>(null);

	return (
		<div style={{ position: 'relative' }}>
			<div ref={containerRef} />
			<div ref={modalsRef} />

			<Button onPress={() => setIsVisible1(true)}>
				Open modal window
			</Button>
			<br />
			<br />
			<Button onPress={() => setIsVisible2(true)}>
				Open modal window 1 to modals stack
			</Button>
			<br />
			<br />
			<Button onPress={() => setIsVisible3(true)}>
				Open modal window 2 to modals stack
			</Button>
			<ModalStackContext.Provider value={modalsRef}>
				<Modal
					visible={isVisible1}
					view="default"
					onClose={() => setIsVisible1(false)}
					scope={containerRef}
				>
					<div style={{ padding: '1rem' }}>
						Et consequatur corrupti.
					</div>
				</Modal>
				<Modal
					visible={isVisible2}
					view="default"
					onClose={() => setIsVisible2(false)}
					renderToStack
				>
					<div style={{ padding: '1rem' }}>
						Modal window context #1
					</div>
				</Modal>
				<Modal
					visible={isVisible3}
					view="default"
					onClose={() => setIsVisible3(false)}
					renderToStack
				>
					<div style={{ padding: '1rem' }}>
						Modal window context #2
					</div>
				</Modal>
			</ModalStackContext.Provider>
		</div>
	);
};
