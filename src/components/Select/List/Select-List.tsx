import React, { createContext, FC, useContext } from 'react';
import { useComponentRegistry } from '@bem-react/di';

import { DeepUnion2 } from '../../../types/union';

import { IMenuDesktopProps } from '../../Menu/Menu@desktop';
import { IModMenuTypeCheckbox } from '../../Menu/_type/Menu_type_checkbox';
import { IModMenuTypeRadio } from '../../Menu/_type/Menu_type_radio';

import { ISelectDesktopRegistry } from '../Select.registry/desktop';
import { cnSelect } from '../Select';
import './Select-List.css';

export interface ISelectList
	extends IMenuDesktopProps,
		DeepUnion2<IModMenuTypeCheckbox, IModMenuTypeRadio> {
	visible?: boolean;
}

export const SelectListContext = createContext<Partial<ISelectList>>({});

export const SelectList: FC<ISelectList> = ({
	className,
	visible,
	...props
}) => {
	const { Menu } = useComponentRegistry<ISelectDesktopRegistry>(cnSelect());

	const ctx = useContext(SelectListContext);

	return (
		<Menu
			tabIndex={-1}
			pickStrategy="keydown"
			{...ctx}
			{...props}
			className={cnSelect('List', { visible }, [
				className,
				ctx.className,
			])}
		/>
	);
};
