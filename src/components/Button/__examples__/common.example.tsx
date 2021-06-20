import React from 'react';

import { Button } from '../Button.bundle/desktop';
import { ButtonContent } from '../Content/Button-Content';
import { Icon } from '../../Icon/Icon.bundle/desktop';

const buttonViews = ['action', 'default', 'pseudo', 'clear'] as const;

export const View = () => (
	<>
		{buttonViews.map((view, index) => (
			<span key={index}>
				<Button view={view} as="button">
					{view}
				</Button>{' '}
			</span>
		))}
	</>
);

export const Disabled = () => (
	<>
		{buttonViews.map((view, index) => (
			<span key={index}>
				<Button view={view} as="button" disabled>
					{view}
				</Button>{' '}
			</span>
		))}
	</>
);

export const Size = () => (
	<>
		{(['l', 'm', 's'] as const).map((size, index) => (
			<span key={index}>
				{buttonViews.map((view, index2) => (
					<span key={index2}>
						<Button {...{ size, view }} as="button">
							{view}
						</Button>{' '}
					</span>
				))}
				{index < 2 ? (
					<>
						<br />
						<br />
					</>
				) : undefined}
			</span>
		))}
	</>
);

export const Types = () => (
	<>
		<Button view="pseudo" as="button">
			button
		</Button>{' '}
		<Button view="pseudo" as="a" type="link" url="#">
			link
		</Button>{' '}
		<Button view="pseudo" as="span">
			span
		</Button>
	</>
);

export const WithIcon = () => (
	<table>
		<tbody>
			<tr>
				<td>
					<Button
						view="default"
						as="button"
						size="l"
						iconLeft={(className) => (
							<Icon
								className={className}
								glyph="close"
								size="l"
							/>
						)}
						iconRight={(className) => (
							<Icon
								className={className}
								glyph="expand-more"
								size="l"
							/>
						)}
					>
						both sides
					</Button>
				</td>
				<td>
					<Button
						view="default"
						as="button"
						size="m"
						iconLeft={(className) => (
							<Icon className={className} glyph="check" />
						)}
					>
						select item
					</Button>
				</td>
				<td>
					<Button
						view="default"
						as="button"
						size="s"
						iconRight={(className) => (
							<Icon
								className={className}
								glyph="unfold-more"
								size="s"
							/>
						)}
					>
						unfold
					</Button>
				</td>
				<td>
					<Button
						view="default"
						as="button"
						size="l"
						iconLeft={() => <Icon glyph="close" />}
					></Button>{' '}
					<Button
						view="default"
						as="button"
						size="m"
						iconLeft={() => <Icon glyph="close" />}
					></Button>{' '}
					<Button
						view="default"
						as="button"
						size="s"
						iconLeft={() => <Icon glyph="close" size="s" />}
					></Button>
				</td>
			</tr>

			{buttonViews.map((view, index) => (
				<tr key={index}>
					<td>
						<Button
							view={view}
							as="button"
							size="m"
							iconLeft={(className) => (
								<Icon className={className} glyph="close" />
							)}
							iconRight={(className) => (
								<Icon
									className={className}
									glyph="expand-more"
								/>
							)}
						>
							both sides
						</Button>
					</td>
					<td>
						<Button
							view={view}
							as="button"
							size="m"
							iconLeft={(className) => (
								<Icon className={className} glyph="check" />
							)}
						>
							select item
						</Button>
					</td>
					<td>
						<Button
							view={view}
							as="button"
							size="m"
							iconRight={(className) => (
								<Icon
									className={className}
									glyph="unfold-more"
								/>
							)}
						>
							unfold
						</Button>
					</td>
					<td>
						<Button
							view={view}
							as="button"
							size="m"
							iconRight={(className) => (
								<Icon
									className={className}
									glyph="unfold-more"
								/>
							)}
						>
							unfold
						</Button>
					</td>
					<td>
						<Button view={view} as="button" size="m" raw>
							<ButtonContent>
								<Icon glyph="close" />
							</ButtonContent>
						</Button>
					</td>
				</tr>
			))}
		</tbody>
	</table>
);
