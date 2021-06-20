import React from 'react';
import { cn } from '@bem-react/classname';

import { Icon } from '../Icon.bundle/desktop';
import './common.example.css';

const glyphList = [
	'unfold-more',
	'expand-more',
	'close',
	'check',
	'cancel',
	'check-thick',
	'minus-thick',
] as const;

const IconExampleTableContainer = cn('IconExampleTableContainer');

export const Glyphs = () => (
	<table className={IconExampleTableContainer()}>
		<tbody>
			<tr>
				<td rowSpan={2}>glyph</td>
				<td colSpan={3}>scalable + custom size</td>
				<td colSpan={5}>size attribute</td>
			</tr>
			<tr>
				<td>64px</td>
				<td>32px</td>
				<td>18px</td>
				<td>xl</td>
				<td>l</td>
				<td>m</td>
				<td>s</td>
				<td>xs</td>
			</tr>
			{glyphList.map((glyph, index) => (
				<tr key={index}>
					<td>{glyph}</td>
					<td>
						<Icon
							glyph={glyph}
							scalable
							style={{ width: '64px', height: '64px' }}
						></Icon>
					</td>
					<td>
						<Icon
							glyph={glyph}
							scalable
							style={{ width: '32px', height: '32px' }}
						></Icon>
					</td>
					<td>
						<Icon
							glyph={glyph}
							scalable
							style={{ width: '18px', height: '18px' }}
						></Icon>
					</td>
					<td>
						<Icon glyph={glyph} size="xl"></Icon>
					</td>
					<td>
						<Icon glyph={glyph} size="l"></Icon>
					</td>
					<td>
						<Icon glyph={glyph} size="m"></Icon>
					</td>
					<td>
						<Icon glyph={glyph} size="s"></Icon>
					</td>
					<td>
						<Icon glyph={glyph} size="xs"></Icon>
					</td>
				</tr>
			))}
		</tbody>
	</table>
);
