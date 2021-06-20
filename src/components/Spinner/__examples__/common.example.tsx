import React, { useState } from 'react';
import { Button } from '../../Button/Button.bundle/desktop';
import { Textinput } from '../../Textinput/Textinput.bundle/desktop';

import { Spinner } from '../Spinner.bundle/desktop';

export const BaseSpinner = () => {
	return (
		<div>
			<Spinner progress view="primitive" />{' '}
			<Spinner progress view="icon" />
		</div>
	);
};

export const SpinnerSizes = () => {
	return (
		<div>
			<Spinner progress size="l" />
			<Spinner progress size="m" />
			<Spinner progress size="s" />
		</div>
	);
};

export const SpinnerCenter = () => {
	const size = '300px';

	return (
		<div style={{ position: 'relative', width: size, height: size }}>
			<Spinner progress position="center" size="l" />
		</div>
	);
};

export const SpinnerInComponents = () => {
	const [inputValue, setInputValue] = useState('');

	return (
		<>
			<div>
				<Button
					iconRight={(className) => (
						<div className={className}>
							<Spinner progress size="s" />
						</div>
					)}
				>
					Loading button
				</Button>
			</div>
			<br />
			<div>
				<Textinput
					placeholder="Loading input"
					value={inputValue}
					setValue={setInputValue}
					hasClear
					onClearClick={() => setInputValue('')}
					iconRight={
						<div
							style={{
								position: 'relative',
								minWidth:
									'var(--typography-controls-icon-size-m)',
							}}
						>
							<div
								style={{
									position: 'absolute',
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
								}}
							>
								<Spinner progress size="s" />
							</div>
						</div>
					}
				/>
			</div>
		</>
	);
};
