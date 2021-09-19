import React, { FC, useRef, useState } from 'react';
import { applyMaxHeight, Direction } from '../../../hooks/behavior/usePopper';
import { Button } from '../../Button/Button.bundle/desktop';
import { Popup } from '../Popup.bundle/desktop';

const directions = {
	vertical: ['top', 'bottom'] as Direction[],
	horizontal: ['left', 'right'] as Direction[],
};

const Content: FC = (props) => {
	return (
		<div
			{...props}
			style={{
				padding: 8,
				background: 'var(--color-essential)',
				color: 'var(--color-typo-primary)',
				maxWidth: '200px',
				overflow: 'auto',
				borderRadius: 'inherit',
			}}
		/>
	);
};

export const Hover = () => {
	const btnRef = useRef(null);
	const [isVisible, isVisibleSet] = useState(false);

	return (
		<div style={{ position: 'relative' }}>
			<Button
				innerRef={btnRef}
				onMouseEnter={() => isVisibleSet(true)}
				onMouseLeave={() => isVisibleSet(false)}
			>
				Hover me
			</Button>
			<Popup
				visible={isVisible}
				view="default"
				target="anchor"
				anchor={btnRef}
				direction={['top', 'right', 'bottom', 'left']}
				hasTail
				style={{ display: 'flex' }}
				zIndex={1}
			>
				<Content>Lorem ipsum dolor sit amet.</Content>
			</Popup>
		</div>
	);
};

function generateGetBoundingClientRect(x = 0, y = 0) {
	return () => ({
		width: 10,
		height: 10,
		top: y,
		right: x,
		bottom: y,
		left: x,
		x,
		y,
		toJSON() {},
	});
}

export const VirtualTarget = () => {
	const [isVisible, isVisibleSet] = useState(false);
	const virtualAnchor = useRef({
		getBoundingClientRect: generateGetBoundingClientRect(100, 200),
	});

	return (
		<div style={{ position: 'relative' }}>
			<Button onPress={() => isVisibleSet((state) => !state)}>
				Open popup with virtual anchor
			</Button>
			<Popup
				hasTail
				visible={isVisible}
				view="default"
				target="anchor"
				anchor={virtualAnchor}
				direction={directions['vertical']}
				modifiers={[applyMaxHeight]}
				onClose={() => isVisibleSet(false)}
				style={{ display: 'flex' }}
				zIndex={1}
			>
				<Content>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Quos tenetur excepturi sed explicabo. Odit, nesciunt itaque.
					Libero itaque voluptates repudiandae fugit et illum saepe
					qui, expedita ducimus quidem commodi aspernatur porro!
					Expedita totam commodi iusto quidem tempore vero eaque dicta
					maxime est nostrum ipsa sunt numquam labore rem doloribus
					odio quam quia quo laboriosam libero, a provident
					consequatur sit id? Quo earum, beatae soluta optio autem
					amet unde eum perspiciatis repudiandae atque ipsam itaque
					quidem, harum obcaecati necessitatibus sint placeat est
					aliquid! Assumenda distinctio nesciunt vitae ut quidem
					itaque tempore, dolorem delectus, ad error, ipsa architecto
					eos maiores omnis ducimus!
				</Content>
			</Popup>
		</div>
	);
};

export const BigText = () => {
	const btnRef = useRef(null);
	const [isVisible, isVisibleSet] = useState(false);
	const [direction, setDirection] =
		useState<keyof typeof directions>('vertical');

	return (
		<div style={{ position: 'relative' }}>
			<Button
				innerRef={btnRef}
				onPress={(evt) => {
					if (evt.ctrlKey) {
						setDirection((dir) =>
							dir === 'vertical' ? 'horizontal' : 'vertical',
						);
					} else {
						isVisibleSet((state) => !state);
					}
				}}
			>
				{`Click me [direction: ${direction}]`}
			</Button>
			<Popup
				hasTail
				visible={isVisible}
				view="default"
				target="anchor"
				anchor={btnRef}
				direction={directions[direction]}
				modifiers={[applyMaxHeight]}
				// tailOffset={10}
				onClose={() => isVisibleSet(false)}
				style={{ display: 'flex' }}
				zIndex={1}
			>
				<Content>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Quos tenetur excepturi sed explicabo. Odit, nesciunt itaque.
					Libero itaque voluptates repudiandae fugit et illum saepe
					qui, expedita ducimus quidem commodi aspernatur porro!
					Expedita totam commodi iusto quidem tempore vero eaque dicta
					maxime est nostrum ipsa sunt numquam labore rem doloribus
					odio quam quia quo laboriosam libero, a provident
					consequatur sit id? Quo earum, beatae soluta optio autem
					amet unde eum perspiciatis repudiandae atque ipsam itaque
					quidem, harum obcaecati necessitatibus sint placeat est
					aliquid! Assumenda distinctio nesciunt vitae ut quidem
					itaque tempore, dolorem delectus, ad error, ipsa architecto
					eos maiores omnis ducimus!
				</Content>
			</Popup>
		</div>
	);
};
