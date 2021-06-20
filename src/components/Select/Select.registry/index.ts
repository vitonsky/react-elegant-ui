import { ComponentType } from 'react';

import { ISelectTrigger } from '../Trigger/Select-Trigger';

export interface ISelectRegistry {
	Trigger: ComponentType<ISelectTrigger>;
}
