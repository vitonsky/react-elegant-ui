import React, { useRef, useState } from 'react';
import { FC } from 'react';
import { Button } from '../../Button/Button.bundle/desktop';
import { Popup } from '../../Popup/Popup.bundle/desktop';

const toggle = (state: boolean) => !state;

export const ComplexPopup: FC = () => {
	const [popupState1, setPopupState1] = useState(false);
	const [popupState2, setPopupState2] = useState(false);
	const [popupState3, setPopupState3] = useState(false);

	const buttonRef1 = useRef<HTMLElement>(null);
	const buttonRef2 = useRef<HTMLElement>(null);
	const buttonRef3 = useRef<HTMLElement>(null);

	return (
		<div>
			<Button
				innerRef={buttonRef1}
				onPress={() => setPopupState1(toggle)}
			>
				Open popup
			</Button>
			<Popup
				target="anchor"
				anchor={buttonRef1}
				view="default"
				visible={popupState1}
				zIndex={1}
				onClose={() => setPopupState1(false)}
			>
				<div style={{ padding: '1rem' }}>
					Welcome to popup #1
					<Button
						innerRef={buttonRef2}
						onPress={() => setPopupState2(toggle)}
					>
						Open another popup
					</Button>
					<Popup
						target="anchor"
						anchor={buttonRef2}
						view="default"
						visible={popupState2}
						onClose={() => setPopupState2(false)}
					>
						<div style={{ padding: '1rem' }}>
							Hello, it's popup #2
							<Button
								innerRef={buttonRef3}
								onPress={() => setPopupState3(toggle)}
							>
								I need more popups!
							</Button>
							<Popup
								target="anchor"
								anchor={buttonRef3}
								view="default"
								visible={popupState3}
								onClose={() => setPopupState3(false)}
							>
								<div style={{ padding: '1rem' }}>
									Ok, it's fine, look at me, popup #3
								</div>
							</Popup>
						</div>
					</Popup>
				</div>
			</Popup>
		</div>
	);
};
